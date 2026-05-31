import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import { errorHandler } from './middlewares/errorHandler.middleware';
import { limiter } from './middlewares/rateLimiter.middleware';
import { stripeWebhookHandler } from "./webhooks/stripe.webhook";



const app = express();


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

/*
  STRIPE WEBHOOK ROUTE
  MUST come BEFORE express.json()
*/
app.post(
  "/api/v1/payments/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler
);


app.use(helmet());
app.use(express.json({ limit: "16kb" }));
// app.use(express.raw());
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"));
app.use(limiter);
app.use(cookieParser());


//import router
import authRouter from "./routes/auth.routes"
import adminRouter from "./routes/admin.routes"
import productRouter from "./routes/product.routes"
import categoryRouter from "./routes/category.routes";
import imageRouter from "./routes/upload.routes";
import cartRoutes from "./routes/cart.routes";
import paymentRoutes from "./routes/payment.routes";
import orderRoutes from "./routes/order.routes";
import reviewRoutes from "./routes/review.routes";


// Router declaration
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/upload", imageRouter)
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/reviews", reviewRoutes);





// Global Error Middleware
app.use(errorHandler);

export default app;