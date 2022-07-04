import express from "express";
import { productsPost } from "../controllers/productsController.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";
import productValidator from "../validators/productValidator.js";
import authorizeUser from "../middleware/authorizeUser.js";

const router = express.Router();

router.use(authorizeUser);

router.post("/", requiredValues(["productName", "productNumber", "ExpireDate", "productPrice"]), productValidator(), checkValidation, productsPost);  

export default router;