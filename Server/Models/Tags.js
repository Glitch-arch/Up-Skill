import mongoose from 'mongoose'

const {Schema} = mongoose

const TagsSchema = new Schema({
    Name: {
        type: String,
    },
    description: {
        type: String,
    },
    Course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const model = mongoose.model("Tags", TagsSchema)
export default model