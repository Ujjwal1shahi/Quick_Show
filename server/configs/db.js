import mongoose from "mongoose";

const connect_Db = async () => {
  try {
    const uri = process.env.MONGODB_URI?.trim();

    if (!uri) {
      throw new Error("MONGODB_URI is missing in server/.env");
    }

    await mongoose.connect(uri, { family: 4 });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed:", error.message);
  }
};

export default connect_Db;