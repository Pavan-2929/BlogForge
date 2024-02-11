import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const createPost = async (req, res, next) => {
  const { title, content, category, image } = req.body;
  const userId = req.id;
  const userEmail = req.email;
  const username = req.username;
  const isAdmin = req.isAdmin;
  const profilePicture = req.profilePicture;
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

    res.status(200).json({ message: "Post create sucessfully", post });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.find();

    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const post = await Post.findOne({ slug });

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const post = await Post.findById(id);

    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export const userPosts = async (req, res, next) => {
  try {
    const userId = req.id.toString();

    if (userId !== req.params.id) {
      return next(errorHandler(400, "You can not access another's post"));
    }
    const posts = await Post.find({ userId: userId });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const Blog = await Post.findById(req.params.id);

    if (!Blog) {
      return next(errorHandler(400, "Can not find Blog"));
    }

    if (req.id.toString() !== Blog.userId) {
      return next(errorHandler(400, "You can only change you account"));
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {

    const Blog = await Post.findById(req.params.id)

    if(!Blog){
      return next(errorHandler(404, "Blog not found"))
    }

    if(req.id.toString() !== Blog.userId){
    return next(errorHandler(400, "You can only delete your Blogs"));
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json("deleted")

  } catch (error) {
    next(error);
  }
};
