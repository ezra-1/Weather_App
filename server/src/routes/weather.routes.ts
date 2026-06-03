import { Router } from "express";
import { searchLocations } from "../controllers/weather.controller";

const router = Router();

router.get("/", searchLocations);

export default router;
