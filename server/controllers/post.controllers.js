import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const createPost = async (req, res, next) => {
  const { title, content,category, image } = req.body;
  const userId = req.id
  const userEmail = req.email
  const username = req.username
  const isAdmin = req.isAdmin
  const profilePicture = req.profilePicture
  try {
    if (!title || !content) {
      return next(errorHandler(404, "Enter all details"));
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const postData = {
      userId,
      userEmail,
      username,
      isAdmin,
      profilePicture,
      image,
      title,
      content,
      category,
      slug,
      ...Post(image && { image }),
    };

    const post = await Post.create(postData);

    res.status(200).json({message: "Post create sucessfully", post});
  } catch (error) {
    next(error)
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.find();

    res.status(200).json(allPosts)
  } catch (error) {
    console.log(error);
  }
}

export const getPost = async (req, res, next) => {
  try {
    const slug = req.params.slug

    const post = await Post.findOne({slug});

    res.status(200).json(post)
  } catch (error) {
    console.log(error);
    next(error)
  }
}

export const userPosts = async (req, res, next) => {
  try {
    const userId = req.id.toString()
    
    if(userId === req.params.id){
      const posts = await Post.find({userId: userId})

      res.status(200).json(posts)
    }
    else{
      next()
    }
  } catch (error) {
    next(error)
  }
} 