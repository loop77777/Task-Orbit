import dotenv from "dotenv";
import { app } from "./app.js";
import { connectToDatabase } from "./config/db.js";

dotenv.config();

const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing in environment configuration.");
}

const startServer = async () => {
  await connectToDatabase(mongoUri);
  app.set("trust proxy", 1);
  app.listen(port, () => {
    console.log(`API server running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
