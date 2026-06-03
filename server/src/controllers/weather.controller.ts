import { Request, Response } from "express";
import { getGeocoding } from "../services/weather.service";

export const searchLocations = async (
  req: Request,
  res: Response
) => {
  try {
    const search = req.query.q as string;

    if (!search) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const locations = await getGeocoding(search);

    return res.json(locations);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch locations",
    });
  }
};
