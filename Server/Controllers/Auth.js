import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import otpGenerator from "otp-generator";
import OTP from "../Models/OTP.js";
import Profile from "../Models/Profile.js";
import { mailSender } from "../Utils/mailSender.js";

dotenv.config();

// OTP Generation Logic
export const otpSend = async (req, res) => {
  try {
    const { email } = req.body;

    // Authentication
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exist ",
      });
    }

    // Not yet unique
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const otpPayload = { otp: otp, email: email };
    const dbentry = await OTP.create(otpPayload);
    if (dbentry) {
      console.log("success");
    } else {
      console.log("error");
    }

    res.status(200).json({
      success: true,
      message: "otp sent",
      data: otpPayload,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// After Signup redirection to signIn and to avoid that what should be dn ??

// SIGNUP ROUTE
export const signup = async (req, res) => {
  const data = req.body;
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    otp,
    contactNo,
  } = data;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !otp
  ) {
    return res.status(400).json({
      success: false,
      message: "error for value ",
    });
  }

  if (confirmPassword !== password) {
    return res.status(400).json({
      success: false,
      message: "error",
    });
  }

  //     User already exist or Not
  const doesExist = await User.findOne({ email });
  if (doesExist) {
    //     redirect it to the signIn page
    // console.log(doesExist);
    return res.status(400).json({
      success: false,
      message: "User already Exists",
    });
  } else {
    //     Password hashing
    //     Enter it in the db

    //     Find most recent OTP
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!recentOtp) {
      //      Throw error
      return res.status(400).json({
        success: false,
        message: "OTP not found in DB",
      });
    }
    if (otp !== recentOtp[0].otp) {
      console.log(otp, recentOtp);
      return res.status(400).json({
        success: false,
        message: " Caught an error while checking otp",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      contactNumber: contactNo,
      gender: null,
      dateOfBirth: null,
      about: null,
    });
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      accountType,
      additionalDetails: profileDetails,
      image: "UrlPending //Dicebear",
    });

    if (newUser) {
      console.log("New user created");
      return res.status(200).json({
        success: true,
        message: "User Created",
      });
    } else {
      console.log("Error occurred while creating User");
    }
  }
};

// SIGNING ROUTE
// TRY CATCH Pending

export const login = async (req, res) => {
  // check if userExists or not
  // If it does check the password
  // If correct redirect it to dashboard and Generate a JWT Token / Cookies

  try {
    const data = req.body;
    const { email, password } = data;

    if (!email && !password) {
      return res.status.json({
        success: false,
        message: "Fill your details carefully",
      });
    }

    const doesExist = await User.findOne({ email }).populate(
      "additionalDetails"
    );

    if (!doesExist) {
      // Redirect it to signUp page
      console.log("User doesnt exist");
      return res.status(400).json({
        success: false,
        message: "User doesnt exist, check your Email Address",
      });
    }
    // verify password

    const payload = {
      email: doesExist.email,
      id: doesExist._id,
      role: doesExist.role,
    };
    if (await bcrypt.compare(password, doesExist.password)) {
      //     redirect and JWT generation
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      // user = user.toObject()
      doesExist.token = token;
      doesExist.password = undefined;

      // Creating a cookie in which we will send the JWT token
      // Cookie name , data , options ( valid , expiry )

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        doesExist,
        message: "User logged in successfully",
      });
    } else {
      console.log("Got some error in jwt part ");
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

// Change Password

export const changePassword = async (req, res) => {
  // data form req
  // validation
  // if correct change password in db
  // send mail password updated

  const { email, oldPassword, newPassword, confirmPassword } = req.data;

  const dbPass = await User.findOne({ email });

  if (
    !email ||
    !oldPassword ||
    !newPassword ||
    !confirmPassword ||
    newPassword !== confirmPassword
  ) {
    return res.status.json({
      success: false,
      message: " Enter correct data  ",
    });
  }

  if (!dbPass) {
    return res.status.json({
      success: false,
      message: "Email doesnt exist ",
    });
  }

  if (bcrypt.compare(oldPassword, dbPass.password)) {
    dbPass.password = newPassword;
    await User.updateOne({ email: email }, { password: newPassword });
  }

  await mailSender(email, "password Changed", " Password Changed");
};
