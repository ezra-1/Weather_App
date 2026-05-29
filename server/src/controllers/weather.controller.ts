import { Request, Response } from "express";
import { getWeatherByCity } from "../services/weather.service";

export const getWeather = async (req: Request, res: Response) => {
  try {
    const city = req.query.city as string;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const data = await getWeatherByCity(city);

    res.json({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};
