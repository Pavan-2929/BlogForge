import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { userData } from '../controllers/user.controllers.js'

const router = express.Router()

router.get('/', verifyToken, userData)

export default router