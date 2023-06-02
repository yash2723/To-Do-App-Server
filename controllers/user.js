import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendToken } from "../utilities/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
}

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.find({ email: email });

        if(user.length > 0) {
            return res.status(403).json({
                success: false,
                msg: "User already exist."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.insertMany([{
            name: name,
            email: email,
            password: hashedPassword,
        }]);

        sendToken(newUser, res, "Registration Successful.", 201);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return next(new ErrorHandler("User does not exist.", 403));
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch) {
            sendToken(user, res, "Login Successful.", 200);
        } else {
            return next(new ErrorHandler("Invalid Email or Password.", 403));
        }
    } catch (error) {
        next(error);
    }

}

export const getMyProfile = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        res.status(200).cookie("token", "", { 
            expires: new Date(Date.now()),
            sameSite: (process.env.NODE_ENV === 'development' ? "lax" : "none"),
            secure: (process.env.NODE_ENV === 'development' ? false : true)
         }).json({
            success: true,
            msg: "Logout Successful."
        });
    } catch (error) {
        next(error);
    }
}