import express from "express";
import cors from "cors";
import "dotenv/config";
import connect_Db from "./configs/db.js";
import authRouter from "./routes/authRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

await connect_Db();

const configuredOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowLocalhostDevOrigin = (origin = "") => {
  if (process.env.NODE_ENV === "production") return false;
  return /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
};

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (configuredOrigins.includes(origin) || allowLocalhostDevOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running!" });
});

app.use("/api/auth", authRouter);
app.use("/api", movieRouter);
app.use("/api/admin", adminRouter);


app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
