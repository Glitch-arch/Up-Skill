import mongoose from "mongoose";
import bycrpt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  image: {
    type: String,
    required: true,
  },
  courseProgress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseProgress",
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

// userSchema.pre("save", async function (next) {
//     try {
//         if (this.password) {
//             this.password = await bycrpt.hash(this.password, 10);
//         }
//         next();
//     } catch (err) {
//         return next(err);
//     }
// })

const model = mongoose.model("user", userSchema);
export default model;
