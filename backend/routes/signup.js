import express from "express";
import { signupPost } from "../controllers/signupController.js";
import checkValidation from "../validators/checkValidation.js";
import signupValidator from "../validators/signupValidator.js";
import requiredValues from "../validators/requiredValues.js";

const router = express.Router();

router.post("/", requiredValues(["username", "password", "emailAddress"]), signupValidator(), checkValidation, signupPost);   
export default router;