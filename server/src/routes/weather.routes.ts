import { Router } from "express";
import {
  geocodingController,
  oneCallController,
  reverseGeoController
} from "../controllers/weather.controller";

const router = Router();
router.get("/", geocodingController);
router.get("/onecall", oneCallController);
router.get("/reversegeo", reverseGeoController);

export default router;
