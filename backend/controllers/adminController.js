import createError from "http-errors";
import User from "../models/user.js";

export const countUsers = async (req, res, next) => {

    let numOfDoc;

    try {
        numOfDoc = await User.countDocuments({});
    } catch {
        return next(createError(500, "Database can not be queried"));
    }

    res.json({ count: numOfDoc });
}