// import file from "../Models/File.js";
import {v2 as cloudinary} from 'cloudinary'


// Getting file from user to Local server
export const localFileUpload = async (req, res) => {

    try {

        // file from req
        // Path where to save
        // then move the file to that path

        const file = req.files.file
        let path = __dirname + "/files" + Date.now() + `.${file.split('.')[1]}`

        file.mv(path, (error) => {
            console.log(error)
        })

        res.json({
            success: true,
            message: "Local file moved"
        })
    } catch (error) {
        console.log(error)
    }

}

// Local storage to cloudinary
// Data fetch
// Validations
// isFile is supported or not
// Upload the file to cloudinary
// DB Save
// Response

function isFileSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

export const cloudImageUpload = async (req, res) => {

    try {

        const {name, tags, email} = req.body
        const file = req.files.imageFile
        const supportedTypes = ['jpg', 'jpeg', 'png']

        const fileType = file.name.split('.'[1].toLowerCase())
        if (!isFileSupported(fileType, supportedTypes)) {

            res.status(400).json({
                success: false,
                message: "Unsupported File type"

            })
        }

        const options = "SNimage"
        const response = await cloudinary.uploader.upload(file.tempFilePath, options)
        const imageUrl = response.secure_url
        //     DB entry
        const fileData = await file.create({
            name,
            email,
            imageUrl
        })

        res.status(200).json({
            success: true,
            imageUrl: imageUrl,
            message: 'File uploaded to the cloud'

        })

    } catch (error) {

        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while uploading to cloud'

        })

    }

}

export const cloudVideoUpload = async (req, res) => {

    try {

        const {name, email} = req.body
        const file = req.files.videoFile

        const fileType = file.name.split('.'[1].toLowerCase())
        const supportedTypes = ['mp4', 'mkv']

        if (!isFileSupported(fileType, supportedTypes)) {

            res.status(400).json({
                success: false,
                message: "Unsupported File type"

            })
        }

        const options = {folder: "SNvideo"}
        options.resource_type = "auto";
        const response = await cloudinary.uploader.upload(file.tempFilePath, options)
        const videoUrl = response.secure_url
        //     DB entry
        const fileData = await file.create({
            name,
            email,
            videoUrl
        })

        res.status(200).json({
            success: true,
            videoUrl: videoUrl,
            message: 'File uploaded to the cloud'

        })

    } catch (error) {

        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while uploading to cloud'

        })

    }

}


export const imageSizeReducer = async (req, res) => {
    try {

        const {name, tags, email} = req.body
        const file = req.files.imageFile
        const supportedTypes = ['jpg', 'jpeg', 'png']

        const fileType = file.name.split('.'[1].toLowerCase())

        // Can add limit for file size
        if (!isFileSupported(fileType, supportedTypes)) {

            res.status(400).json({
                success: false,
                message: "Unsupported File type"

            })
        }

        const options = "SNimage"
        options.quality = 30
        const response = await cloudinary.uploader.upload(file.tempFilePath, options)
        const imageUrl = response.secure_url
        //     DB entry
        const fileData = await file.create({
            name,
            email,
            imageUrl
        })

        res.status(200).json({
            success: true,
            imageUrl: imageUrl,
            message: 'File uploaded to the cloud'

        })

    } catch (error) {

        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while uploading to cloud'

        })

    }
}



















