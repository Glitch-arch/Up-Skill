import Course from "../Models/Course.js";
import {uploadImageToCloudinary} from "../Utils/imageUploader.js";
import User from "../Models/User.js";
import dotenv from "dotenv";
import Tags from "../Models/Tags.js";

dotenv.config()

export const createCourse = async (req, res) => {

    // data fetch
    // validations
    // instructor validation
    // Tag validation
    // Cloudinary upload
    // db entry
    // add course entry in user schema

    try {

        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body
        const thumbnail = req.files.thumbnailImage;


        if (!courseName || !courseDescription || !whatYoutWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const userId = req.user.id
        const instructorDetails = await User.findById(userId)

        if (!instructorDetails) {
            //     Throw error
        }

        //     Check given tag is valid -> needed for postman
        const tagDetails = await Tag.findById(tag)

        if (!tagDetails) {
            //     throw error
        }

        //     Upload to cloudinary

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tagDetails._id
        })

        // add course to instructor user schema

        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id
                }
            }
        )

        await Tags.findByIdAndUpdate({_id: tag}, {
            $push: {
                courses: newCourse._id
            }
        })

        return res.status(200).json({

            success: true,
            message: ' Course Created '

        })


    } catch (error) {

        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an er'
        })
    }
}

export const showAllCourses = async (req, res) => {

    try {

        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReview: true,
            studentEnrolled: true
        }).populate('instructor')


        return res.status(200).json({
            success: true,
            message: 'Fetched all courses successfully',
            data: allCourses
        })

    } catch (error) {

        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while getting all courses '

        })

    }

}