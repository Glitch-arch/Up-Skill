import { dbconnect } from "./config/dbconfig.js";

import express from "express";
import dotenv from "dotenv";

// Routes
import userRoute from "./Routes/user.js";
import courseRoute from "./Routes/Course.js";
import paymentRoute from "./Routes/Payments.js";
import profileRoute from "./Routes/Profile.js";

// Some Functions
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from "./config/cloudinary.js";
import FileUpload from "./Routes/FileUpload.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();
const app = express();
// Connecting to database
dbconnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);
// app.use("/api/v1/reach", contactUsRoute);

// Testing the server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
