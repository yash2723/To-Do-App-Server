import express from "express";
import { config } from "dotenv";
import connectDB from "./data/dbconnect.js";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import cookieParser from "cookie-parser";
import { error } from "./middlewares/error.js";
import cors from "cors";

const app = express();

config({
    path: "./config.env",
});
connectDB();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,    
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started at port: http://localhost:${port} in ${process.env.NODE_ENV} Mode`);
});

// Error Middleware
app.use(error);