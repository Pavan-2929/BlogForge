import User from "../models/user.model.js"

export const userData = async (req, res, next) => {
    try {
        const userID = req.id.toString()

        const user = await User.findById(userID).select("-password");

        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
}