import mongoose from 'mongoose'

const {Schema} = mongoose

const profileSchema = new Schema({
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String
    },
    contactNumber: {
        type: Number,
        trim: true
    }

})

const model = mongoose.model("profile", profileSchema)
export default model