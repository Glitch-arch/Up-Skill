import Profile from "../Models/Profile.js";
import User from "../Models/User.js";
import { uploadImageToCloudinary } from "../Utils/imageUploader.js";

//  Because Profile object already created while creating User
export const updateProfile = async (req, res) => {
  // get data
  // get userID
  // validation
  // find profile
  // return response

  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    const id = req.user.id;

    if (!contactNumber || !dateOfBirth || !id) {
      res.status(400).json({
        success: false,
        message: "check your input details",
      });
    }

    const user = await User.findById(id);
    const profileId = user.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gener = gender;
    profileDetails.contactNumber = contactNumber;

    // why Its not working ???
    await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profileDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: " Caught an error while authenticating user",
    });
  }
};

export const deleteProfile = async (req, res) => {
  // Pending to remove user form enrolled user
  // How to do cron job for  the delete request

  try {
    const id = req.user.id;
    const userDetails = await User.findById(id);
    if (!userDetails) {
      // throw error
    }

    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    await User.findByIdAndDelete({ _id: id });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: " Caught an error while authenticating user",
    });
  }
};

export const getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    console.log(error.message, "error in updateDisplayPicture");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
