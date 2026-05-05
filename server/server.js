import express from "express";
import cors from "cors";
import "dotenv/config";
import connect_Db from "./configs/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// connect database
await connect_Db();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});