import createError from "http-errors";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signupPost = async (req, res, next) => {
    const { username, password, firstName, lastName, companyName, emailAddress } = req.body;
    let foundUsername;
    try {
        foundUsername = await User.findOne({ username: username });
    } catch {
        return next(createError(500, "Can not query the Database"));
    }
    if (foundUsername) {
        return next(createError(409, "This user is already exist"));
    }
    let foundEmail;
    try {
        foundEmail = await User.findOne({ emailAddress: emailAddress });
    } catch {
        return next(createError(500, "Can not query the Database"));
    }
    if (foundEmail) {
        return next(createError(412, "This Email is already exist"));
    }
    const newUser = new User({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        emailAddress: emailAddress,
        isAdmin: false,
        products: []
    });
    try {
        await newUser.save();  
    } catch {
        return next(createError(500, "Can not create the user"));
    }
    let newToken;
    try {   
        newToken = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, { expiresIn: "1h" } )
        res.cookie("dataCookie", newToken, { httpOnly: true, sameSite: "Strict" });
    } catch {
        return next(createError(500, "can not sign up"));
    }
    res.status(201).json({ id: newUser._id, token: newToken });
}