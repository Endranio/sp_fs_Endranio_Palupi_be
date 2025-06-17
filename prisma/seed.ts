

import { PrismaClient, taskStatus, memberRole } from '../src/generate/prisma'; // ← ubah path jika perlu

const prisma = new PrismaClient();

async function main() {
 
  const [alice, bob, charlie] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: { email: 'alice@example.com', username: 'alice' },
    }),
    prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: { email: 'bob@example.com', username: 'bob' },
    }),
    prisma.user.upsert({
      where: { email: 'charlie@example.com' },
      update: {},
      create: { email: 'charlie@example.com', username: 'charlie' },
    }),
  ]);

 
  const projectAlpha = await prisma.project.create({
    data: {
      name: 'Project Alpha',
      description: 'Project milik Alice, Bob & Charlie ikut mengerjakan',
      ownerId: alice.id,
      members: {
        createMany: {
          data: [
            { userId: alice.id, role: memberRole.Owner },
            { userId: bob.id,   role: memberRole.Member },
            { userId: charlie.id, role: memberRole.Member },
          ],
        },
      },
    },
  });

 
  const projectBeta = await prisma.project.create({
    data: {
      name: 'Project Beta',
      description: 'Project milik Bob, Alice & Charlie ikut mengerjakan',
      ownerId: bob.id,
      members: {
        createMany: {
          data: [
            { userId: bob.id,   role: memberRole.Owner },
            { userId: alice.id, role: memberRole.Member },
            { userId: charlie.id, role: memberRole.Member },
          ],
        },
      },
    },
  });

 
  await prisma.task.createMany({
    data: [
 
      {
        title: 'Setup repo',
        description: 'Inisialisasi monorepo di GitHub',
        status: taskStatus.Todo,
        projectId: projectAlpha.id,
        assignedId: alice.id,          
      },
      {
        title: 'Tulis ERD',
        description: 'Beri review di Notion',
        status: taskStatus.OnProgres,
        projectId: projectAlpha.id,
        assignedId: bob.id,            
      },
      {
        title: 'CI/CD Railway',
        description: 'Otomasikan deploy staging',
        status: taskStatus.Done,
        projectId: projectAlpha.id,
        assignedId: charlie.id,        
      },

    
      {
        title: 'Buat landing page',
        description: 'Next.js + Tailwind',
        status: taskStatus.Todo,
        projectId: projectBeta.id,
        assignedId: bob.id,
      },
      {
        title: 'Integrasi auth',
        description: 'JWT & middleware',
        status: taskStatus.OnProgres,
        projectId: projectBeta.id,
        assignedId: alice.id,        
      },
      {
        title: 'Write unit test',
        description: 'Jest for service layer',
        status: taskStatus.Done,
        projectId: projectBeta.id,
        assignedId: charlie.id,
      },
    ],
  });

  console.log('🌱  Seed kompleks selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
