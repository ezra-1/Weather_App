import express from "express";
import weatherRoutes from "./routes/weather.routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);

export default app;
