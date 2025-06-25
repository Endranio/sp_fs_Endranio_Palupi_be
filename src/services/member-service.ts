import { CreateProjectDTO } from "../dtos/dto";
import prisma from "../libs/prisma";

class MemberService {

   

  async listEligibleUsers(projectId: string) {
  
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { ownerId: true, members: { select: { userId: true } } },
  });
  if (!project) throw new Error('Project not found');

  const excludedIds = [
    project.ownerId,
    ...project.members.map((m) => m.userId),
  ];

  return prisma.user.findMany({
    where: { id: { notIn: excludedIds } },
    select: { id: true, username: true, email: true },
  });
}

async getMember(projectId:string){
    return prisma.membership.findMany({
        where:{projectId},
        include:{
          user:{
            select:{
              email:true,
              username:true
            }
          }
        }
    })
}

async addMember(userId:string,projectId:string){
  return await prisma.membership.create({
    data:{
      userId,projectId
    }
  })
}

async deleteMember(userId:string,projectId:string){
    return prisma.membership.delete({
        where:{userId_projectId:{
            userId,projectId
        }}
    })
}

}

export default new MemberService()