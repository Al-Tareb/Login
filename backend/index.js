import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import signupRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import adminRouter from "./routes/admin.js";

const app = express();
dotenv.config()

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5gjjn9z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
mongoose.connection.on("open", () => console.log("Database connected"));
mongoose.connection.on("error", () => console.error);


app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/admin", adminRouter);
app.use(globalErrorHandler);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server has started on port ${process.env.port || 3001}!`);
})