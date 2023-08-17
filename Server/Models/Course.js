import mongoose from 'mongoose'

const {Schema} = mongoose

const courseSchema = new Schema({
    courseName: {
        type: String,
    },
    courseDescription: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    whatYouWillLearn: {
        type: String,
        trim: true
    },
    courseContent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    ratingAndReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RatingAndReview'
    },
    price: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    Tag: {
        type: String,
        required: true
    },
    studentEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

})

const model = mongoose.model("course", courseSchema)
export default model