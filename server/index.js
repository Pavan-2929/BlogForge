import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import cors from 'cors'

const app = express();

const PORT = process.env.PORT;

app.use(express.json())
app.use(cors({credentials: true, origin:"http://localhost:5173"}))

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Mongoose connected");
}).catch((error) => {
    console.log(error);
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})