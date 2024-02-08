import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return next(errorHandler(400, "Please enter all details"));
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return next(errorHandler(400, "User already exist"));
    }

    const newUser = await User.create({ username, email, password });

    const token = await newUser.generateToken();
    const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 365 * 1000);

    res.cookie("token", token, { expires: expiryDate, secure: false });

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
