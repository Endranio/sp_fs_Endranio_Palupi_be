import { Request,Response,NextFunction } from "express"
import taskService from "../services/task-service"
import { createTask } from "../schemas/task-schema"

class TaskController {

    async getTaskByProjectId(req:Request, res:Response, next:NextFunction){
        try {
            const {projectId} = req.params
            const task = await taskService.getTaskByProject(projectId)

            res.json(task)
        } catch (error) {
            next(error)
        }
    }

    async createTask(req:Request, res:Response, next:NextFunction){
        try {
            const {projectId} = req.params
            const body = req.body

            const validate = await createTask.validateAsync(body)
            const task = await taskService.createTask(projectId,validate)

            res.json({data:task, message:"Task created"})
        } catch (error) {
            next(error)
        }
    }

    async updateTask(req:Request, res:Response, next:NextFunction){
        try {
            const {id} = req.params
            const body = req.body

            const validate = await createTask.validateAsync(body)
            const task = await taskService.updateTask(id,validate)

            res.json({data:task, message:"Task edited"})
        } catch (error) {
            next(error)
        }
    }

    async updateStatus(req:Request, res:Response, next:NextFunction){
        try {
            const {id,newStatus} = req.body
            const task = await taskService.updateStatus(id,newStatus)
            res.json(task)
        } catch (error) {
            next(error)
        }
    }

     async deleteProject(req:Request, res:Response, next:NextFunction){
            try {
                const {id} =req.params
                await taskService.deleteTask(id)
                res.json("Deleted")
            } catch (error) {
                next(error)
            }
        }
}

export default new TaskController()