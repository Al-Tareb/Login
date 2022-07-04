import createError from "http-errors";
import jwt from "jsonwebtoken";

const authorizeUser = (req, res, next) => {
    let token;
    try {
        token = req.cookies.dataCookie;
        if (!token) {
           throw new Error("User unauthorized"); 
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch {
        next(createError(403, "User can not be authorized"));
    }
}

export default authorizeUser;