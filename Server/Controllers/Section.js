import Section from "../Models/Section.js";
import course from "../Models/Course.js";

export const createSection = async (req, res) => {

    // data fetch
    // validation
    // create section
    // update course with section id
    // return res

    try {
        // course id because to update section in course schema
        const {sectionName, courseId} = req.body

        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: ' Fill all the details  '

            })
        }

        const newSection = await Section.create({
            sectionName
        })

        const updateCourse = await course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id
            }
        })

        // How to populate to replace sections and sub-section both in updatedCourseDetails


        res.status(200).json({
            success: true,
            message: ' section created ',
            updateCourse

        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while creating section ',
            error: error.message
        })
    }

}


export const updateSection = async (req, res) => {

    // data fetch
    // validation
    // update data
    // return res

    try {

        const {sectionName, sectionId} = req.body
        if (!sectionName || !sectionId) {
            res.status(400).json({
                success: false,
                message: 'fill all the details '

            })
        }

        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true})


        res.status(200).json({
            success: true,
            message: 'Section updated '

        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while updating section '

        })
    }

}


export const deleteSection = async (req, res) => {

    // fetch
    // validation
    // delete section
    // return res

    try {

        // get Id - assuming that sending id in params
        const {sectionId} = req.params

        if (!sectionId) {

            res.status(400).json({
                success: false,
                message: 'error while deleting the section - section not found'

            })
        }
        // what if i use delete one
        const deleteSection = Section.findByIdAndDelete(sectionId)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while deleting the section'

        })
    }

}






















