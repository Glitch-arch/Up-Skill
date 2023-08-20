import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const auth = (req, res, next) => {

    try {
        // Or token can be access thru req.cookies.token or req.header("Authorization").replace("Bearer","")
        const token = req.body.token
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        if (!token) {
            return res.status(401).json({
                success: false,
                message: ' Caught an error while authenticating user'
            })
        }

        // why req.user = payload why not req = payload
        req.user = payload
        next()

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: ' Caught an error while authenticating user'

        })
    }


}

export const isStudent = (req, res, next) => {

    try {

        const {role} = req.user.accountType

        if (role === 'student') {
            next()
        } else {
            console.log("Ur trying to access wrong route")
        }

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: ' Caught an error while authenticating user'

        })
    }


}


export const isInstructor = (req, res, next) => {

    try {

        const {role} = req.user.accountType

        if (role === 'instructor') {
            next()
        } else {
            console.log("Ur trying to access wrong route")
        }

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: ' Caught an error while authenticating user'

        })
    }

}

