import mongoose from 'mongoose'
import {mailSender} from "../Utils/mailSender.js";

const {Schema} = mongoose

const OTPSchema = new Schema({
    email: {
        type: String,
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    },

})

async function sendVerificationMail(email, otp) {
    const mailResponse = await mailSender(email, "Something", otp)
}

OTPSchema.pre('save', async function (next) {
    await sendVerificationMail(this.email, this.otp)
    next()
})

const model = mongoose.model("OTP", OTPSchema)
export default model