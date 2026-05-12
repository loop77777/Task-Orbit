import { Router } from "express";
import { createTask, deleteTask, listTasks, updateTask } from "../controllers/taskController.js";

export const taskRouter = Router();

taskRouter.get("/", listTasks);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);
