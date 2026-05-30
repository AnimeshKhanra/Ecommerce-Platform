import dotenv from "dotenv";

dotenv.config();


import app from './app';
import { logger } from "./config/logger";
import prisma from "./config/prisma";

const PORT = process.env.PORT || 5000;

(async function startServer() {
  try {
    await prisma.$connect();
    logger.info("Database connected successfully");

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Database connection failed");
    process.exit(1);
  }
})();
