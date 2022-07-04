import { check } from "express-validator";

const productValidator = () => {
    const currentYear = new Date().getFullYear();  
    return [
       
        check("productName")
            .isLength({ min: 3 })
            .withMessage("Product name should be more than 3 characters"),
       
        check("productNumber")
            .isNumeric()
            .withMessage("Product Number should be a Number"),
       
        check("ExpireDate")
            .isNumeric()
            .withMessage("Expire Date should be a number")
            .custom(value => {
                return value >= currentYear;                
            })
            .withMessage(`Expire Date should not be less than ${currentYear}`),

        check("productDescription")
            .isLength({ min: 10 })
            .withMessage("Product Description should be more than 10 characters"),
            
        check("productPrice")
            .isNumeric()
            .withMessage("Product Price should be a Number"),
       
    ]
}

export default productValidator;