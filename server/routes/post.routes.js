import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createPost, getAllPosts, getPost, userPosts } from "../controllers/post.controllers.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get('/getposts', getAllPosts)
router.get('/getpost/:slug', getPost)
router.get('/user/:id', verifyToken, userPosts)

export default router