import { RegisterDTO } from '../dtos/dto';

import prisma from '../libs/prisma';

class AuthService {
  async register(data: RegisterDTO) {
    return await prisma.user.create({
        data:{
            ...data
        }
    })
 
}
async login(email:string){
    return await prisma.user.findUnique({
        where:{email},
    })
}

async getUserById(id:string){
    return await prisma.user.findUnique({
        where:{id},
    })
}
}
export default new AuthService();