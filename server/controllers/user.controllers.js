import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import errorHandler from "../utils/error.js";

export const userData = async (req, res, next) => {
  try {
    const userID = req.id.toString();

    const user = await User.findById(userID).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userID = req.id.toString();
    const updatedData = req.body;

    if (req.body.password) {
      req.body.password = bcrypt.hash(req.body.password, 10);
    } else {
      delete updatedData.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userID },
      { $set: updatedData },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json("USer update succsessfully");
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userID = req.id;

    await User.findByIdAndDelete(userID);

    res.clearCookie("token");
    res.status(200).json("User deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};
