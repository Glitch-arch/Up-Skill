import mongoose from 'mongoose'

const {Schema} = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ['Admin', 'Student', 'Instructor'],
        required: true
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    image: {
        type: String,
        required: true
    },
    courseProgress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseProgress'
    }


})

const model = mongoose.model("user", userSchema)
export default model