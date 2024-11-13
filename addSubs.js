const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addSubs() {
  await prisma.subscription.deleteMany();

  const subs = [
    {
      id: "688f4b3d-5e9a-4b3d-9e7b-7d4b3d5e9a4b",
      name: "Youssef Charif Hamidi",
      email: "youssef.charif.h@gmail.com",
      query:
        "https://remoteotter.com/api/get_jobs?query=React&categories=Design&jobTypes=&location=ma",
    },
    {
      id: "83184f4b-5e9a-4b3d-9e7b-7d4b3d5e9a4b",
      name: "Youssef Charif Hamidi",
      email: "youssef.charif.h@gmail.com",
      query:
        "https://remoteotter.com/api/get_jobs?query=&categories=Software Development&jobTypes=full_time&location=",
    },
    //    {
    //      id: "83184f4b-5f6b-873d-9e7b-7d4b3d5e9a4b",
    //      name: "Abdulrahman Hany",
    //      email: "abdulrahman.h@gmail.com",
    //      query:
    //        "https://remoteotter.com/api/get_jobs?query=Sales&categories=Marketing&jobTypes=&location=",
    //    },
  ];
  for (let sub of subs) {
    await prisma.subscription.create({
      data: {
        id: sub.id,
        name: sub.name,
        email: sub.email,
        query: sub.query,
      },
    });
  }
}
addSubs();
