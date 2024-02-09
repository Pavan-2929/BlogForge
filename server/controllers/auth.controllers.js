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

    if (password !== confirmPassword) {
      return next(400, "Eneter same password");
    }

    const newUser = await User.create({ username, email, password });

    const token = await newUser.generateToken();
    const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 365 * 1000);

    res.cookie("token", token, {
      expires: expiryDate,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validEmail = await User.findOne({ email });
    if (!validEmail) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = await validEmail.comparePassword(password);
    if (!validPassword) {
      return next(errorHandler(400, "Enter valid password"));
    }

    const token = await validEmail.generateToken();
    const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 365 * 1000);

    res.cookie("token", token, {
      expires: expiryDate,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json(validEmail);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await res.clearCookie("token");
    res.status(200).json("Logout successfully");
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { username, email, profilePicture } = req.body;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      const token = await isUserExist.generateToken();
      const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 365 * 1000);
      res.cookie("token", token, {
        expires: expiryDate,
        secure: true,
        sameSite: "None",
      });

      res.status(200).json(isUserExist);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);

      const newUser = User.create({
        username,
        email,
        password: generatedPassword,
        profilePicture,
      });

      const token = await newUser.generateToken();
      const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 365 * 1000);
      res.cookie("token", token, {
        expires: expiryDate,
        secure: true,
        sameSite: "None",
      });
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);
  }
};
