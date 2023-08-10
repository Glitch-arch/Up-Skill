const express = require('express')
const {response} = require("express");
require('dotenv').config();

const app = express()

// Why do i have to use this ?? To parse ig
app.use(express.json())

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

app.use('api/v1', user)

//  Basic route
app.get("/", (req, res) => {
    console.log("Hitting get req on server")
    res.body.json({})
})
