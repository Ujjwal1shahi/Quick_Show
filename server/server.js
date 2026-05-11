import express from "express";
import cors from "cors";
import "dotenv/config";
import connect_Db from "./configs/db.js";
import userRouter from "./routes/User.js";
import movieRouter from "./routes/movieRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

await connect_Db();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running!" });
});

app.use("/api/user", userRouter);
app.use("/api", movieRouter);


app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
