import { Request, Response } from "express";
import {
  getGeocoding,
  getOneCall,
  getReverseGeo,
} from "../services/weather.service";

export const geocodingController = async (
  req: Request,
  res: Response
) => {
  try {
    const search = req.query.q as string;
    const limit = Number(req.query.limit);

    if (!search) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const data = await getGeocoding(search, limit);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch geocoding data",
    });
  }
};

export const oneCallController = async (
  req: Request,
  res: Response
) => {
  try {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);
    const units = (req.query.units as string) || "metric";

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({
        error: "Latitude and longitude are required",
      });
    }

    const data = await getOneCall(lat, lon, units);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch weather data",
    });
  }
};

export const reverseGeoController = async (
  req: Request,
  res: Response
) => {
  try {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({
        error: "Latitude and longitude are required",
      });
    }

    const data = await getReverseGeo(lat, lon);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch reverse geocoding data",
    });
  }
};
