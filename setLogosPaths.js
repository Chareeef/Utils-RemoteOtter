const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const jobs = await prisma.job.findMany();

  for (const job of jobs) {
    await prisma.job.update({
      where: { id: job.id },
      data: {
        companyLogo: job.companyLogo.replace(
          "/home/youcha/otter/images/",
          "/assets/companies/",
        ),
      },
    });
  }
}
main();
