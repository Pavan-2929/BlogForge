import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createPost, deletePost, getAllPosts, getPost, getPostById, getPostBySearchTerm, updatePost, userPosts } from "../controllers/post.controllers.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get('/getposts', getAllPosts)
router.get('/getpost/:slug', getPost)
router.get("/getpostbyid/:id", getPostById)
router.get('/user/:id', verifyToken, userPosts)
router.post("/update/:id", verifyToken, updatePost)
router.delete("/delete/:id", verifyToken, deletePost)
router.get("/getPostBySearchTerm", getPostBySearchTerm);

export default router