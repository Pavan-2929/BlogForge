import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    required: true,
  },
  profilePicture:{
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJmGQU-YJkAWvjqyS0zA6Ul5zqRPNBK_8YA&usqp=CAU",
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
}, {timestamps: true});

const Post = new mongoose.model("Post", postSchema);

export default Post;
