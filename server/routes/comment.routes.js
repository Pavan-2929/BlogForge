import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { createComment, deleteComment, editComment, likeComment, showComment } from '../controllers/comment.controllers.js'

const router = express.Router()

router.post('/create', verifyToken, createComment)
router.get('/show/:id', showComment)
router.put('/likeComment/:id', verifyToken, likeComment)
router.put('/editComment/:id', verifyToken, editComment)
router.delete("/deleteComment/:id", verifyToken, deleteComment)

export default router