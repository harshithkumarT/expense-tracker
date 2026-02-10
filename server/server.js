import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import pool from "./config/db.js"
import authRouter from "./routes/authRoutes.js";
import expenseRouter from "./routes/expenseRouter.js"

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));
app.use("/auth", authRouter);
app.use("/api", expenseRouter)

app.listen(port, (req, res) => {
    console.log(`the server is running on port ${port}`);
})

