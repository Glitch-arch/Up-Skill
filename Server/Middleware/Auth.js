import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/User.js";

dotenv.config();

export const auth = (req, res, next) => {
  try {
    // Or token can be access thru req.cookies.token or req.header("Authorization").replace("Bearer","")
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: " Caught an error while authenticating user",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // why req.user = payload why not req = payload
      req.user = payload;
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: " Caught an error while authenticating user",
    });
  }
};

export const isStudent = (req, res, next) => {
  try {
    const { role } = req.user.accountType;

    if (role === "student") {
      next();
    } else {
      console.log("Ur trying to access wrong route");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: " Caught an error while authenticating user",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Admin",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};

export const isInstructor = (req, res, next) => {
  try {
    const { role } = req.user.accountType;

    if (role === "instructor") {
      next();
    } else {
      console.log("Ur trying to access wrong route");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: " Caught an error while authenticating user",
    });
  }
};
