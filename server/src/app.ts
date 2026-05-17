import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import { errorHandler } from './middlewares/errorHandler.middleware';
import { limiter } from './middlewares/rateLimiter.middleware';



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
import productRouter from "./routes/product.routes"
import categoryRouter from "./routes/category.routes";
import imageRouter from "./routes/upload.routes";


// Router declaration
app.use("/api/v1/auth", authRouter )
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/upload", imageRouter)





// Global Error Middleware
app.use(errorHandler);

export default app;