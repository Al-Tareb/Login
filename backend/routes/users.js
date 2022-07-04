import express from "express";
import { getUserData, updateProducts, deleteProducts, deleteProduct, deleteUser } from "../controllers/usersController.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";
import authorizeUser from "../middleware/authorizeUser.js";

const router = express.Router();

router.use(authorizeUser);

router.get("/:id", getUserData);    

router.patch("/:id/products", requiredValues(["id"]), checkValidation, updateProducts);  

router.delete("/:id/products", deleteProducts);   

router.delete("/:id/products/:productId", deleteProduct);  

router.delete("/:id", deleteUser);    
export default router;