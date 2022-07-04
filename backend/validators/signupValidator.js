import { check } from "express-validator";

const registerValidator = () => {
    return [
        
        check("username")
            .trim().isLength({ min: 3, max: 15 })
            .withMessage("Username must be between 4 and 15 characters"),
           

        check("password")
            .escape().trim().isStrongPassword()
            .withMessage("Password should not less than 8 characters, contain  lowercase, uppercase letter, number and symbol"),
       
        check("emailAddress")
            .normalizeEmail().isEmail()
            .withMessage("Email address should be valid")
    ]
}

export default registerValidator;