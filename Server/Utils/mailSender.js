import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { response } from "express";

dotenv.config();
export const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = transporter.sendMail({
      from: `"Lenovo Legion SN Testing Machine" <${process.env.MAIL_USER}>`,
      to: email,
      subjects: title,
      html: body,
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({
      success: "false",
      error: error.message,
    });
  }
};
