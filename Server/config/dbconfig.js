import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export const dbconnect = async () => {

    try {
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
            console.log("Connected successfully");
        });

    } catch (error) {
        console.log("error occurred while connecting to mongodb ")
    }


}

