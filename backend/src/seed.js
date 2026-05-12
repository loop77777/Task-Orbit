import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import { Task } from "./models/Task.js";

dotenv.config();

const tasks = [
  {
    title: "Design homepage hero section",
    description: "Finalize typography, spacing, and CTA placement for desktop and mobile.",
    completed: false
  },
  {
    title: "Integrate login API",
    description: "Connect frontend login form with backend auth endpoint and handle errors.",
    completed: true
  },
  {
    title: "Write unit tests for task controller",
    description: "Cover create, update, delete, and validation failure cases.",
    completed: false
  },
  {
    title: "Optimize task list rendering",
    description: "Reduce unnecessary re-renders and improve perceived speed on large lists.",
    completed: false
  },
  {
    title: "Prepare deployment checklist",
    description: "Verify env variables, CORS settings, and build commands for production.",
    completed: true
  },
  {
    title: "Add empty state illustration",
    description: "Show a friendly empty-state when no tasks are available.",
    completed: false
  },
  {
    title: "Refactor API error handling",
    description: "Return consistent JSON error shape across all endpoints.",
    completed: false
  },
  {
    title: "Document setup in README",
    description: "Add backend and frontend setup steps with environment examples.",
    completed: true
  }
];

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing in environment configuration.");
}

const seed = async () => {
  await connectToDatabase(mongoUri);
  await Task.deleteMany({});
  await Task.insertMany(tasks);
  console.log(`Seeded ${tasks.length} tasks successfully.`);
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});
