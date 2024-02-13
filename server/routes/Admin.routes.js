import express from 'express'
import { getAllPostsData, getAllUsersData } from '../controllers/Admin.controllers.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.get("/getAllUsersData", verifyToken, getAllUsersData);
router.get("/getAllPostsData", verifyToken, getAllPostsData)

export default router