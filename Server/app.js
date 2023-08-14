import {dbconnect} from "./config/dbconfig.js";
import express from 'express'
import dotenv from 'dotenv'
import user from './Routes/user.js'
import fileUpload from 'express-fileupload'
import {cloudinaryConnect} from "./config/cloudinary.js";
import FileUpload from './Routes/FileUpload.js'

dotenv.config()

dbconnect()
cloudinaryConnect()
const app = express()

// Middlewares
// Why do i have to use this ?? To parse ig
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}))

// Server Function
const server = () => {

    app.listen(process.env.PORT, (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Server running on port")

        }
    })

}
server();

app.use('/api/v1/upload', FileUpload)
app.use('/api/v1', user)

//  Basic route
app.get("/", (req, res) => {
    console.log("Hitting get req on server")
    res.body.json({})
})
