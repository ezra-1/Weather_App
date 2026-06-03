import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Routes
app.use("/api/weather", weatherRoutes);

export default app;
