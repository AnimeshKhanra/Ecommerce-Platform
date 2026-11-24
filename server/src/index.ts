import dotenv from "dotenv";

dotenv.config();


import app from './app';
import { logger } from "./config/logger";
import prisma from "./config/prisma";

const PORT = Number(process.env.PORT || 5000);
const HOST = process.env.HOST || "0.0.0.0";
  

(async function startServer() {
  try {
    await prisma.$connect();
    logger.info("Database connected successfully");

    app.listen(PORT, HOST, () => {
      logger.info(`Server running on ${HOST}:${PORT}`);
    });
  } catch (error) {
    logger.error("Database connection failed");
    process.exit(1);
  }
})();
