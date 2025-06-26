
import { CreateTaskDTO } from "../dtos/dto";
import prisma from "../libs/prisma";
import { taskStatus } from "@prisma/client";

class TaskService {

    async getTaskByProject(projectId:string){
        return await prisma.task.findMany({
            where:{projectId},
           include:{
            assignee:{
                select:{
                    username:true
                }
            }
           }
        })
    }

    async createTask(projectId:string,data:CreateTaskDTO){
        return await prisma.task.create({
            data:{
                projectId,
                ...data
            }
        })
    }

    async updateTask(id:string,data:CreateTaskDTO){
        return await prisma.task.update({
            where:{id},
            data:{
                ...data
            }
        })
    }

    async updateStatus(id:string ,newStatus:taskStatus){
        return await prisma.task.update({
            where:{id},
            data:{
                status:newStatus
                
            }
        })
    }

    async deleteTask(id:string){
        return await prisma.task.delete({
            where:{id}
        })
    }
}

export default new TaskService()