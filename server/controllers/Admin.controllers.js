import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const getAllUsersData = async (req, res, next) => {
  try {
    const loggedInUser = await User.findById(req.id);

    if (!loggedInUser.isAdmin) {
      return next(errorHandler(400, "You can't access Admin-Pannel"));
    }

    const allUsers = await User.find();

    res.status(200).json(allUsers);
    
  } catch (error) {
    next(error);
  }
};

export const getAllPostsData = async (req, res, next) => {
  try {

    const loggedInUser = await User.findById(req.id);

    if (!loggedInUser.isAdmin) {
      return next(errorHandler(400, "You can't access Admin-Pannel"));
    }

    const allPosts = await Post.find();

    res.status(200).json(allPosts)
  } catch (error) {
    next(error);
  }
}
