import course from "../Models/Course.js";
import {uploadImageToCloudinary} from "../Utils/imageUploader.js";
import User from "../Models/User.js";


const createCourse = async (req, res) => {

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

    } catch (error) {

        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an er'
        })
    }
}

