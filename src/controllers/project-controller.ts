import { Request,Response,NextFunction } from "express"
import projectService from "../services/project-service"
import { createProject } from "../schemas/project-schema"

class projectController {
    async getProject(req:Request, res:Response, next:NextFunction){
        try {
         const {userId} = req.params
            const project = await projectService.getProject(userId)
            res.json(project )
        
        } catch (error) {
            next(error)
        }
    }

     async createProject(req:Request, res:Response, next:NextFunction){
        try {
         const {userId} = req.params
         const body = req.body
         const validated = await createProject.validateAsync(body)
            const project = await projectService.createProject(userId,validated)
            res.json({data:project , message:"Project created"} )
        
        } catch (error) {
            next(error)
        }
    }

     async updateProject(req:Request, res:Response, next:NextFunction){
        try {
         const {id} = req.params
         const body = req.body
         const validated = await createProject.validateAsync(body)
            const project = await projectService.updateProject(id,validated)

            res.json({data:project , message:"Project edited"} )
        
        } catch (error) {
            next(error)
        }
    }

    async deleteProject(req:Request, res:Response, next:NextFunction){
        try {
            const {id} =req.params
            await projectService.deleteProject(id)
            res.json("Deleted")
        } catch (error) {
            next(error)
        }
    }
}

export default new projectController()