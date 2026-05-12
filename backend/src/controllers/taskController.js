import { Task } from "../models/Task.js";

const toPublicTask = (taskDoc) => ({
  // Flatten Mongo document shape for a cleaner client contract.
  id: taskDoc._id,
  title: taskDoc.title,
  description: taskDoc.description,
  completed: taskDoc.completed,
  createdAt: taskDoc.createdAt,
  updatedAt: taskDoc.updatedAt
});

export const listTasks = async (_req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks.map(toPublicTask));
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description = "" } = req.body;
    const task = await Task.create({ title, description });
    res.status(201).json(toPublicTask(task));
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    // `runValidators` keeps updates aligned with schema constraints.
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(toPublicTask(task));
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
