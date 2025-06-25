import { RegisterDTO } from "../dtos/dto";

import prisma from "../libs/prisma";

class AuthService {
  async register(data: RegisterDTO) {
    return await prisma.user.create({
      data: {
        ...data,
      },
    });
  }
  async login(identity: string) {
    return await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: identity,
          },
          {
            username: identity,
          },
        ],
      },
    });
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }
}
export default new AuthService();
