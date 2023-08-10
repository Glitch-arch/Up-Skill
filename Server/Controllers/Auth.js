import User from "../Models/User";

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require("dotenv").config()


// SIGNUP ROUTE
export const signup = async (req, res) => {

    const data = req.body
    const {email, password, user, role} = data;

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

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({email, password: hashedPassword, user, role})
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

const signIn = (req, res) => {

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


        } else {

        }
    }


}
