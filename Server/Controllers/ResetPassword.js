import User from "../Models/User.js";
import {mailSender} from "../Utils/mailSender.js";
import * as crypto from "crypto";
import bcrypt from "bcrypt";


// Reset Password Token

export const resetPasswordToken = async (req, res) => {

    // Get mail form body
    // check if exists
    // Generate the unique link
    // update user by adding token and expiration time
    // send it via mailSender

    const email = req.body.email
    if (!email) {
        //error
    }
    const doesExist = await User.findOne({email})
    if (!doesExist) {
        // error
    }

    const token = crypto.randomUUID()

    const updateDetails = await User.findOneAndUpdate({email: email},
        {token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000},
        {new: true})

    const url = `http://localhost:3000/update-password/${token}`

    await mailSender(email, 'reset link', url)

    return res.status(200).json({
        success: true,
        message: ' reset link sent '
    })

}


// Reset Password

export const resetPassword = async (req, res) => {

    // token , new passowrd fetch
    // token match
    // password update

    const {token, newPassword, confirmPassword} = req.body

    if (!token || !newPassword || !confirmPassword || confirmPassword !== newPassword) {
        // throw error
    }

    const userDetails = await User.findOne({token})

    if (!userDetails) {
        // throw error
    }

    if (userDetails.resetPasswordExpires < Date.now()) {
        // throw error
    }

    const hashedPassword = await bcrypt.hash(confirmPassword, 10)

    await User.findOneAndUpdate(
        {token: token}, // i dont think theres need for this
        {password: hashedPassword},
        {new: true}
    )


}












