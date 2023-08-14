import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    email: {
        type: String
    }
})

const model = mongoose.model("file", fileSchema)
export default model