import mongoose from 'mongoose'

const {Schema} = mongoose

const courseProgressSchema = new Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    completedVideos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subsection'
    }
})

const model = mongoose.model("courseProgress", courseProgressSchema)
export default model