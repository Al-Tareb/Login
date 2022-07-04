import createError from "http-errors";
import User from "../models/user.js";

export const getUserData = async (req, res, next) => {
    const userId = req.params.id;
    let foundUser; 
    try {
       foundUser = await User.findById(userId);
    } catch {
        return next(createError(500, "Can not query the Database"));
    }
    if (foundUser) {
        await foundUser.populate("products", {
            _id: 1,
            productName: 1,
            productNumber: 1,
            ExpireDate: 1,
            productDescription: 1,
            productPrice: 1
        });
        const userData = {
            firstName: foundUser.firstName,
            products: foundUser.products,
            isAdmin: foundUser.isAdmin
        }
        res.json(userData);
    
    } else {
        next(createError(404, "User is not exist"));
    }
}


export const updateProducts = async (req, res, next) => {
    const productId = req.body.id;    
    const userId = req.params.id;   
    let foundUser;
    try { 
        foundUser = await User.findById(userId);
    } catch {
        return next(createError(500, "can not find the user"))
    }
    const foundProduct = foundUser.products.find(existingId => existingId == productId);
    if (!foundProduct) {
        let updatedUser;
        try {
            
            updatedUser = await User.findByIdAndUpdate(userId, { $push: { products: productId }}, { new: true, runValidators: true });
        } catch {
            return next(createError(500, "can not add the new product"));
        }
        await updatedUser.populate("products", {
            _id: 1,
            productName: 1,
            productNumber: 1,
            ExpireDate: 1,
            productDescription: 1,
            productPrice: 1
        })
        res.json({ products: updatedUser.products });
    } else {
        next(createError(409, "The product is already exists "));
    }
}


export const deleteProducts = async (req, res, next) => {
    const userId = req.params.id;
    let updatedUser;
    try {
        updatedUser = await User.findByIdAndUpdate(userId, { products: [] }, { new: true, runValidators: true })
    } catch {
        return next(createError(500, "can not delete products"));
    }
    res.json(updatedUser.products);
}


export const deleteProduct = async (req, res, next) => {
    const userId = req.params.id;
    const productId = req.params.productId;
    let updatedUser;
    try { 
        updatedUser = await User.findByIdAndUpdate(userId, { $pull: { products: productId }}, { new: true, runValidators: true })
    } catch {
        return next(createError(500, "can not delete the product"));
    }
    await updatedUser.populate("products"); 
    res.json({ products: updatedUser.products });
}

export const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        await User.findByIdAndRemove(userId);
    } catch {
        return next(createError(500, "can not delete the product"));
    }
    res.json({ message: "User has been deleted" });
}