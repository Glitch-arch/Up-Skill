import User from "../Models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import otpGenerator from "otp-generator"
import OTP from "../Models/OTP.js";
import Profile from "../Models/Profile.js";

dotenv.config()


// OTP Generation Logic
const otpSend = async (req, res) => {
    const {email} = req.body

    // Authentication
    const isEmail = User.findOne(email)
    if(isEmail){
        return res.status(400).json({
            success:false,
            message: 'Email already exist '
        })
    }

    // Not yet unique
    const otp = otpGenerator(6, {lowerCaseAlphabets: false upperCaseAlphabets: false, specialChars: false })
    const otpPayload = { otp:otp , email: email}
    const dbentry = OTP.create(otpPayload)
    if(dbentry){
        console.log('success')
    }
    else{
        console.log('error')
    }

    res.status(200).json({
        success: true,
        message:'otp sent'
        data: otpPayload
    })
}

// After Signup redirection to signIn and to avoid that what should be dn ??

// SIGNUP ROUTE
export const signup = async (req, res) => {

    const data = req.body
    const {firstName,lastName,email, password,confirmPassword,  accountType,otp,contactNo} = data;

    if(!firstName || !lastName || !email || !password || !confirmPassword || otp){
        return res.status(400).json({
            success: false,
            message: 'error'
        })
    }

    if(confirmPassword !== password){
        return res.status(400).json({
            success: false,
            message: 'error'
        })
    }


//     User already exist or Not
    const doesExist = User.findOne({email});
    if (doesExist) {
        //     redirect it to the signIn page
        return res.status(400).json({
            success: false,
            message: 'User already Exists'
        })
    } else {
        //     Password hashing
        //     Enter it in the db

        //     Find most recent OTP
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(!recentOtp){
            //      Throw error
            return res.status(400).json({
            success: false,
            message: 'OTP not found in DB'

        })
        }
        if(otp !== recentOtp){

            return res.status(400).json({
            success: false,
            message: ' Caught an error while checking otp'

        })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const profileDetails = await Profile.create(
            {contactNumber: contactNo, gender: null, dateOfBirth: null,about: null}
        )
        const newUser = await User.create(
            {email, password: hashedPassword, firstName,lastName, accountType, additionalDetails: profileDetails,image: "UrlPending"}
        )

        if (newUser) {
            console.log("New user created")
            return res.status(200).json({
                success: true,
                message: 'User Created'
            })
        } else {
            console.log("Error occurred while creating User")
        }
    }


}

// SIGNING ROUTE
// TRY CATCH Pending

export const login = (req, res) => {

    // check if userExists or not
    // If it does check the password
    // If correct redirect it to dashboard and Generate a JWT Token / Cookies

    const data = req.body
    const {email, password, user, role} = data

    if (!email && !password) {
        return res.status.json({
            success: false,
            message: 'Fill your details carefully'
        })
    }

    const doesExist = User.findOne({email})

    if (!doesExist) {
        // Redirect it to signUp page
        console.log("User doesnt exist")
        return res.status(400).json({
            success: false,
            message: 'User doesnt exist, check your Email Address'
        })
    } else {
        // verify password

        const payload = {
            email: user.email,
            id: user.id,
            role: user.role
        }
        if (bcrypt.compare(password, doesExist.password)) {
            //     redirect and JWT generation
            const token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h"
                })

            // user = user.toObject()
            user.token = token
            user.password = undefined

            //     Creating a cookie in which we will send the JWT token
            // Cookie name , data , options ( valid , expiry )
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User logged in successfully'
            })

        } else {
            console.log("Got some error in jwt part ")
        }
    }


}
