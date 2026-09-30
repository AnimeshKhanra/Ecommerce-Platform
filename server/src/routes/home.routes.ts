import { Router } from "express";
import { getHomeDataController } from "../controllers/home.controller";



const router = Router();

router.get("/", getHomeDataController);

export default router;