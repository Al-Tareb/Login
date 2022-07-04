import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const loginPost = async (req, res, next) => {
    const { username, password } = req.body;
    let found;
    try {
        found = await User.findOne({ username: username });
    } catch {
        return next(createError(500, "Can not Query Database"));
    }
    if (found) {
        let isValidPassword;
        try {   
            isValidPassword = await bcrypt.compare(password, found.password);
        } catch {
            return next(createError(500, "Can not Log in"));
        }
        if (!isValidPassword) {
            return next(createError(401, "Password is incorrect "));
        }
        let newToken;
        try {
            newToken = jwt.sign({ id: found.id }, process.env.SECRET_KEY, { expiresIn: "1h" })
            res.cookie("dataCookie", newToken, { httpOnly: true, sameSite: "Strict" } )
        } catch {
            return next(createError(500, "can not sign up"));
        }
        res.json({ id: found._id, token: newToken });
     
    } else {
        next(createError(404, "This user is not exist"));
    }
}