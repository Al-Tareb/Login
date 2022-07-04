import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAdmin = async (req, res, next) => {
    let token;
    try {
        token = req.cookies.dataCookie;
        if (!token) {
           throw new Error("User unauthorized"); 
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        let currentUser;
        try {
            currentUser = await User.findById(decodedToken.id)
        } catch {
            return next(createError(500, "Can not query the database"));
        }
        if (currentUser && currentUser.isAdmin) {
            next();
        } else {
            throw new Error("User unauthorized");
        }
    } catch {
        next(createError(403, "can not authorized the user"));
    }
}

export default isAdmin;