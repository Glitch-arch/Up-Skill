import Tags from "../Models/Tags.js";


export const createTag = async (req, res) => {

    try {
        const {description, name} = req.body

        if (!description || !name) {
            return res.status(400).json({
                success: false,
                message: ' error in tag creation'
            })
        }

        const dbTagCreation = await Tags.create({
            Name: name,
            description: description
        })

        return res.status(200).json({
            success: true,
            message: 'Tag created'
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Got an error while creating an tag '
        })
    }

}


export const showAllTags = async (req, res) => {

    try {

        const fetchAllTags_FormDb = await Tags.find({}, {Name: true, description: true})
        res.status(200).json({
            success: true,
            message: 'All Tags fetched',
            body: fetchAllTags_FormDb

        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while fetching tags form db '

        })
    }


}

















