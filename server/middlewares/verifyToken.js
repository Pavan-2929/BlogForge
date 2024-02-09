import jwt from 'jsonwebtoken'

import errorHandler from "../utils/error.js";
import User from '../models/user.model.js';

const verifyToken = async (req, res, next) => {
    const cookies = req.headers.cookie;

    if (!cookies) {
      return next(errorHandler(404, "cookie not found"));
    }

    const token = cookies.split("=")[1];

    if(!token){
        return next(errorHandler(404, "Cookie not found"))
    }

    try {
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await User.findOne({_id: isVerified.id}).select("-password")

        if(user){
            req.id = user._id
            next();
        }
        else{
            return next(errorHandler(404, "User not found"))
        }
    } catch (error) {
        next(error)
    }
};

export default verifyToken;
