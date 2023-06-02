import jwt from "jsonwebtoken";

export const sendToken = (user, res, msg, statusCode=200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(statusCode)
    .cookie("token", token, {
        httpOnly: true,
        maxAge: 24*60*60,
        sameSite: (process.env.NODE_ENV === 'development' ? "lax" : "none"),
        secure: (process.env.NODE_ENV === 'development' ? false : true)
    })
    .json({
        success: true,
        msg
    });
}