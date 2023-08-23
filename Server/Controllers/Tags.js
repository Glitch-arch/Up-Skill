import Tags from "../Models/Tags.js";

//  Category Changes pending
export const createCategory = async (req, res) => {

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
            message: 'Category created'
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Got an error while creating an Category '
        })
    }

}


export const showAllCategory = async (req, res) => {

    try {

        const fetchAllTags_FormDb = await Tags.find({}, {Name: true, description: true})
        res.status(200).json({
            success: true,
            message: 'All Category fetched',
            body: fetchAllTags_FormDb

        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while fetching Category form db '

        })
    }


}

















