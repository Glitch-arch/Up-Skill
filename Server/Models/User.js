import mongoose from 'mongoose'

const {Schema} = mongoose

const userSchema = new Schema({
    user: String,
    password: String,
    email: String,
    role: ['user', 'student', 'admin']
})

const model = mongoose.model("user", userSchema)
export default model