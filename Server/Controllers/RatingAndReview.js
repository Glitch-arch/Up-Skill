import RatingAndReview from "../Models/RatingAndReview.js";
import Course from "../Models/Course.js";
import ratingAndReview from "../Models/RatingAndReview.js";
import mongoose from "mongoose";

// createRating
export const createRating = async (req, res) => {

    //data fetch
    // check if user exist
    // check if he already gave review
    // create rating and review
    // add in course model
    // return res

    try {

        const {courseId, review, rating} = req.body
        const userId = req.user.id

        if (!courseId || !userId || !review || !rating) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const courseDetails = await Course.findOne({_id: courseId},
            {studentsEnrolled: {$elemMatch: {$eq: userId}}},
        )

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: ' Student is not enrolled in this course '
            })
        }

        const alreadyReviewed = await ratingAndReview.findOne({
            user: userId,
            course: courseId
        })

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'Course is already reviewed by the user'
            })
        }

        const ratingReview = await RatingAndReview.create({
            rating: rating,
            review: review,
            course: courseId,
            user: userId
        })

        await Course.findOneAndUpdate(courseId,
            {
                $push: {
                    ratingAndReview: ratingReview
                }
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: ' '
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while creating Rating'

        })
    }

}

export const getAverageRating = async (req, res) => {

    try {

        const {courseId} = req.body

        // Returning an array
        const avgResult = await RatingAndReview.aggregate(
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: '$rating'}
                }
            }
        )

        if (avgResult.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: avgResult[0].averageRating
            })
        }

        return res.status(200).json({
            success: true,
            message: ' No rating found  ',
            averageRating: 0
        })

    } catch (error) {

        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while Getting average rating '
        })

    }

}

export const getAllRating = async (req, res) => {

    try {

        const allReviews = await RatingAndReview.find({}).sort({rating: 'desc'})
            .populate({path: 'user', select: 'firstName, lastName, email, image'})
            .populate({
                path: 'course',
                select: 'courseName'
            })
            .exec()

        return res.status(200).json({
            success: true,
            allReviews,
            message: ' All reviews fetched '
        })
    } catch (error) {

    }

}