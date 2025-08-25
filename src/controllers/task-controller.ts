import { Request, Response, NextFunction } from "express";
import taskService from "../services/task-service";
import { createTask } from "../schemas/task-schema";
import { io } from "../index";

class TaskController {
  async getTaskByProjectId(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const task = await taskService.getTaskByProject(projectId);

      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const body = req.body;

      const validate = await createTask.validateAsync(body);
      const task = await taskService.createTask(projectId, validate);
      io.emit("message");
      res.json({ data: task, message: "Task created" });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const body = req.body;

      const validate = await createTask.validateAsync(body);
      const task = await taskService.updateTask(id, validate);
      io.emit("message");
      res.json({ data: task, message: "Task edited" });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, newStatus } = req.body.data;
      const task = await taskService.updateStatus(id, newStatus);
      io.emit("message");
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await taskService.deleteTask(id);
      io.emit("message");
      res.json({ message: "Deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
