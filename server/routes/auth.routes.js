import express from 'express'
import { login, logout, register } from '../controllers/auth.controllers.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

export default router