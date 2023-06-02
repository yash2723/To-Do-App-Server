import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticate = async (req, res, next) => {
    const { token } = req.cookies;

    if(!token) {
        return res.status(403).json({
            success: false,
            msg: "User not logged in."
        });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData._id);

    next();
}