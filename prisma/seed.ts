

import { PrismaClient, taskStatus, memberRole } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      username: 'alice',
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      username: 'bob',
    },
  });

  
  const project = await prisma.project.create({
    data: {
      name: 'Project Alpha',
      ownerId: alice.id,
      members: {
        createMany: {
          data: [
            { userId: alice.id, role: memberRole.Owner },
            { userId: bob.id,   role: memberRole.Member },
          ],
        },
      },
    },
  });

 
  await prisma.task.createMany({
    data: [
      {
        title: 'Setup repo',
        description: 'Inisialisasi GitHub repo',
        status: taskStatus.Todo,
        projectId: project.id,
        assignedId: alice.id,
      },
      {
        title: 'Design database',
        description: 'Buat ERD & schema Prisma',
        status: taskStatus.OnProgres,
        projectId: project.id,
        assignedId: bob.id,
      },
      {
        title: 'Deploy staging',
        description: 'Deploy ke Railway',
        status: taskStatus.Done,
        projectId: project.id,
        assignedId: alice.id,
      },
    ],
  });

  console.log('🌱  Seeding selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
