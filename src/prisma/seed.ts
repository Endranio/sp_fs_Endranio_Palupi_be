import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  
  const passwordAlice = await bcrypt.hash("password123", 10);
  const passwordBob = await bcrypt.hash("password456", 10);
  const passwordCharlie = await bcrypt.hash("password789", 10);

  
  await prisma.user.createMany({
    data: [
      {
        email: "alice@example.com",
        username: "alice",
        password: passwordAlice,
      },
      {
        email: "bob@example.com",
        username: "bob",
        password: passwordBob,
      },
      {
        email: "charlie@example.com",
        username: "charlie",
        password: passwordCharlie,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
