import Section from "../Models/Section.js";
import Subsection from "../Models/Subsection.js";
import {uploadImageToCloudinary} from "../Utils/imageUploader.js";
import dotenv from "dotenv";
import section from "../Models/Section.js";

dotenv.config()
export const createSubSection = async (req, res) => {


    try {

        const {sectionId, title, timeDuration, description} = req.body

        const video = req.files.videoFile

        if (!sectionId || !title || !timeDuration || !description) {
            res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

        const subSectionDetails = await Subsection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadDetails.secure_url
        })

        await Section.findByIdAndUpdate(sectionId, {
            $push: {
                subSection: subSectionDetails
            }

        }, {new: true}).populate(section)
        // Not sure about this populate

        return res.status(200).json({
            success: true,
            message: 'SubSection created'
        })


    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while creating subsection'

        })
    }

}


export  const deleteSubSection = async (req,res)=>{

    try {

        const {subSectionId} = req.body
        if(!subSectionId){

            res.status(400).json({
                success: false,
                message: 'All fields are required'

            })
        }

        let deleteSubS = await Subsection.findByIdAndDelete(subSectionId)

        return res.status.json({
            success: true,
            message: ' SubSection deleted successfully '
        })

    } catch (error){
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while deleting subSection'
        })
    }

}

export const updateSubSection = async (req,res) => {

    try {
        const { title, timeDuration, description, subSectionId } = req.body
        const file = req.files.videoFile

        if (!subSectionId || !title || !timeDuration || !description) {
            res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const videoDetails = uploadImageToCloudinary(file,process.env.FOLDER_NAME)

        //  what about deleting that video on cloudinary ??

        Subsection.findByIdAndUpdate(subSectionId,
            {title:title, timeDuration:timeDuration, description:description, videoUrl:videoDetails.secure_url }
            , {new:true}
        )

        res.status(200).json({
            success: true,
            message: 'SubSection updated '
        })

    } catch (error){
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while updating subSection'
        })
    }


}
























