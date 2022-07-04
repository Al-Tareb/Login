import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,  
    lastName: String,   
    companyName: String,
    emailAddress: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, required: true },
    products: [ { type: mongoose.Types.ObjectId, required: true, ref: "Product" } ]
}, { timestamps: true });


userSchema.pre("save", async function(next) {
    if (!this.firstName) {
        this.firstName = "Abdullah";
    }
    if (!this.lastName) {
        this.lastName = "Al-Tareb";
    }
    if (!this.companyName) {
        this.companyName = "Al-Tareb";
    }
    const securePassword = await bcrypt.hash(this.password, 12);
    this.password = securePassword;
    next();
})

const User = mongoose.model("User", userSchema);

export default User;