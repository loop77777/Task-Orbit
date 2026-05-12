import dotenv from "dotenv";
import { app } from "./app.js";
import { connectToDatabase } from "./config/db.js";

dotenv.config();

const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("Startup aborted: MONGODB_URI is missing.");
  console.error("Set MONGODB_URI in Render -> Service -> Environment.");
  process.exit(1);
}

const startServer = async () => {
  try {
    await connectToDatabase(mongoUri);
    app.set("trust proxy", 1);
    app.listen(port, () => {
      console.log(`API server running on port ${port}`);
    });
  } catch (error) {
    console.error("Startup aborted: database connection failed.");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
