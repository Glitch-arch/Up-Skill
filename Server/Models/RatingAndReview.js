import mongoose from 'mongoose'

const {Schema} = mongoose

const ratingAndReviewSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        index: true,
        required: true
    }
})

const model = mongoose.model("ratingAndReview", ratingAndReviewSchema)
export default model


