import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()
export const mailSender = async (email, title, body) => {

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    })

    let info = await transporter.sendMail({
        from: `khush`,
        to: email,
        subjects: title,
        html: body
    })

}