import { CreateProjectDTO } from "../dtos/dto";
import prisma from "../libs/prisma";

class ProjectService {
    async getProject(userId:string){
        return await prisma.project.findMany({
            where:{
                OR:[
                   { ownerId:userId},
                    {
             members: {
              some: {
              userId: userId
            }
          }
        }
                ]
      
            }
        })
    }

    async createProject(userId:string,data:CreateProjectDTO){
        return await prisma.project.create({
            data: {
      ...data,
      ownerId: userId,
      members: {
        create: {
          userId,
          role: 'Owner',
        },
      },
    },
        })
    }

    async updateProject(id:string, data:CreateProjectDTO){
        return await prisma.project.update({
            where:{id},
            data:{
                ...data
            }
        })
    }

    async deleteProject(id:string){
        return await prisma.project.delete({
            where:{id},
        })
    }

    

}



export default new ProjectService()