import mongoose from 'mongoose'

const {Schema} = mongoose

const ratingAndReviewSchema = new Schema({
    user: {
        type: String,
    },
    rating: {
        type: Number,
    },
    review: {
        type: String
    },
})

const model = mongoose.model("ratingAndReview", ratingAndReviewSchema)
export default model


