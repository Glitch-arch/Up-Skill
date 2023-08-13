import express from 'express'
import {signup, login} from "../Controllers/Auth.js";
import {isStudent, isInstructor, auth} from "../Middleware/Auth.js";

const router = express.Router()

// Authenticating routes
// Using POST req because it provides better security whereas get will use query param....
router.post('/login', login)
router.post('/signup', signup)


// Protected Routes -> Authorization
// role checking -> Auth isStudent and all
// Roles -> Student and Instructor

router.post('/student', auth, isStudent, (req, res) => {
    console.log('On student route')
    res.status(200).json({
        message: 'Student route is working '
    })
})

router.post('/instructor', auth, isInstructor, (req, res) => {
    console.log('On instructor route')
    res.status(200).json({
        message: 'Instructor route is working '
    })
})


export default router