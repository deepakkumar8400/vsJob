import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import applicationRoute from "./routes/application.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import userRoute from "./routes/user.route.js";
import connectDB from "./utils/db.js";

dotenv.config();

const startServer = async () => {
    try {
        await connectDB();
        console.log("✅ Database Connected Successfully");

        const app = express();

        // Middleware
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());

        // ✅ CORS Configuration (Allow Multiple Frontend Origins)
        const allowedOrigins = ["http://localhost:5175", "http://localhost:5174"];

        app.use(
            cors({
                origin: function (origin, callback) {
                    if (!origin || allowedOrigins.includes(origin)) {
                        callback(null, true);
                    } else {
                        callback(new Error("Not allowed by CORS"));
                    }
                },
                credentials: true,
            })
        );

        // Routes
        app.get('/home', (req, res) => {
            res.send("Welcome to Home Page");
        });

        // API Routes
        app.use('/api/v1/user', userRoute);
        app.use('/api/v1/company', companyRoute);
        app.use('/api/v1/job', jobRoute);
        app.use('/api/v1/application', applicationRoute);

        // ✅ Use a fixed PORT for stability
        const PORT = process.env.PORT || 9001;
        app.listen(PORT, () => {
            console.log(`✅ Server is running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Database Connection Failed:", error);
        process.exit(1); // Exit the process on failure
    }
};

startServer();
