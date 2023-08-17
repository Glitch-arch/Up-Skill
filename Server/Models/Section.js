import mongoose from 'mongoose'

const {Schema} = mongoose

const sectionSchema = new Schema({
    sectionName: {
        type: String,
    },
    subSection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subsection',
            required: true
        }
    ]
})

const model = mongoose.model("Section", sectionSchema)
export default model