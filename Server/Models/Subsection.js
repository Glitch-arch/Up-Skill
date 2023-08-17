import mongoose from 'mongoose'

const {Schema} = mongoose

const subsectionSchema = new Schema({
    title: {
        type: String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String
    },
    videoUrl: {
        type: String
    }

})

const model = mongoose.model('subsection', subsectionSchema)
export default model