import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import { errorHandler } from './middlewares/errorHandler.middlewares';
import { limiter } from './middlewares/rateLimiter.middlewares';



const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(helmet());
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"));
app.use(limiter);
app.use(cookieParser());


//import router
import authRouter from "./routes/auth.routes"
import adminRouter from "./routes/admin.routes"


// Router declaration
app.use("/api/v1/auth", authRouter )
app.use("/api/v1/admin", adminRouter)

// Global Error Middleware
app.use(errorHandler);

export default app;