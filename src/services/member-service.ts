import { CreateProjectDTO } from "../dtos/dto";
import prisma from "../libs/prisma";

class MemberService {

    // ganti path sesuai project

  async listEligibleUsers(projectId: string) {
  // 1. ambil semua userId yang sudah tergabung (owner + membership)
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { ownerId: true, members: { select: { userId: true } } },
  });
  if (!project) throw new Error('Project not found');

  const excludedIds = [
    project.ownerId,
    ...project.members.map((m) => m.userId),
  ];

  // 2. kembalikan user yang *tidak* ada di excludedIds
  return prisma.user.findMany({
    where: { id: { notIn: excludedIds } },
    select: { id: true, username: true, email: true },
  });
}

async getMember(id:string){
    return prisma.project.findUnique({
        where:{id},
        include:{
                members:true
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