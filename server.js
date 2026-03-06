import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";

import eventRoutes from "./routes/eventRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import sponsorRoutes from "./routes/sponsorRoutes.js";
import advertisementRoutes from "./routes/advertisementRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js"

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());
app.use(helmet());

app.use("/api/events", eventRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sponsors", sponsorRoutes)
app.use("/api/advertisements", advertisementRoutes)
app.use("/api/media", mediaRoutes)

app.get("/", (req, res) => {
  res.send("NWAKS Backend Running \n MongoDB Connected");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(500).json({
    message: "Server Error"
  })
})