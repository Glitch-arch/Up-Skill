import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from 'nodemailer'

dotenv.config()

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

fileSchema.post('save', async function (doc) {

    // Nodemailer config

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    })

    let info = await transporter.sendMail({
        from: `khush`,
        to: doc.email,
        subjects: "New File Uploaded to Cloudinary",
        html: `<h2>somehting</h2>`
    })


})


const model = mongoose.model("file", fileSchema)
export default model




















