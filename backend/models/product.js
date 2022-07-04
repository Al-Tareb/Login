import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    productName: { type: String, required: true },
    productNumber: { type: Number, required: true, min: 1 },
    ExpireDate: { type: Number, required: true },
    productPrice: { type: Number, required: true,min: 10 },
    productDescription:{ type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;