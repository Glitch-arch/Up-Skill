import {instance} from "../config/razorPay.js";
import User from "../Models/User.js";
import Course from "../Models/Course.js";
import {mailSender} from "../Utils/mailSender.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const capturePayment = async (req, res) => {

    // courseId , userId
    // validations -> basic , course id is correct or not , isUser already enrolled or not
    // Payment function
    // response

    try {

        const {courseId} = req.body
        const userId = req.user.id

        if (!courseId || !userId) {
            // throw error

            res.status(400).json({
                success: false,
                message: 'Course id or userid not received '
            })
        }

        const course = await Course.findById(courseId)
        if (!course) {
            // throw error course doesn't exist
            res.status(400).json({
                success: false,
                message: 'Course not found incorrect course id'
            })
        }

        // because userId is in string format and in course schema students enrolled is in object id
        const uid = new mongoose.Types.ObjectId(userId)

        if (course.studentEnrolled.includes(uid)) {
            // throw error already bought
        }

        try {

            const options = {
                amount: course.price,
                currency: 'INR',
                receipt: Math.random(Date.now()).toString(),
                notes: {
                    courseId: courseId,
                    userId
                }
            }

            // Razorpay function
            const paymentResponse = await instance.orders.create(options)

            return res.status(200).json({
                success: true,
                message: ' Order Placed successfully ',
                courseName: course.courseName,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                amount: paymentResponse.amount,
                currency: paymentResponse.currency
            })

        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: ' Caught an error while using payment function'
            })
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while executing payments '

        })
    }


}

export const verifySignature = async (req, res) => {

    try {

        const webhookSecret = process.env.RAZORPAY_SECRET

        const signature = req.headers['x-razorpay-signature']

        const shasum = crypto.createHmac('sha256', webhookSecret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest('hex')

        if (signature === digest) {
            console.log('Payment is authorised')

            // Enrolling student now as payment is authorized
            try {

                const {courseId, userId} = req.body.payload.payment.entity.notes

                const enrolledCourse = await Course.findOneAndUpdate({_id: courseId},
                    {$push: {studentsEnrolled: userId}},
                    {new: true}
                )
                if (!enrolledCourse) {
                    res.status(400).json({
                        success: false,
                        message: 'Course not found'

                    })
                }

                const enrolledUser = await User.findOneAndUpdate({_id: userId},
                    {$push: {courses: courseId}},
                    {new: true}
                )

                const mailResponse = await mailSender(enrolledUser.email, 'mail to enrolled student', 'template will be sent here')

                console.log(mailResponse)

                return res.status(200).json({
                    success: true,
                    message: 'Signature verified and course added'
                })

            } catch (error) {

                res.status(400).json({
                    success: false,
                    message: ' Caught an error while authenticating user'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Signature match failed'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while verifying signature'
        })
    }

}