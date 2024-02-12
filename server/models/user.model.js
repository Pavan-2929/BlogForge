import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const user = this;
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    this.password = hashedPassword;
  } catch (error) {
    console.log("error in hashing", error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
}

userSchema.methods.generateToken = async function () {
  const user = this;
  try {
    return jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "365d",
      }
    );
  } catch (error) {
    console.log("error in jwt", error);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
