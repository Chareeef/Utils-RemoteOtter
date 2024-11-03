const fs = require("fs");
const resemble = require("resemblejs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const img1 = fs.readFileSync("/home/youcha/utils-remoteotter/remotive.jpg");

async function compareRemotiveLogo(path) {
  try {
    const img2 = fs.readFileSync(path);

    const result = await new Promise((resolve) => {
      resemble(img1)
        .compareTo(img2)
        .onComplete((data) => {
          if (data.misMatchPercentage <= 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });

    return result;
  } catch (error) {
    console.error("Invalid path:", path, error);
  }
}
// (async () => {
//   console.log(
//     await compareRemotiveLogo("/home/youcha/utils-remoteotter/remotive.jpg"),
//   );
//   console.log(
//     await compareRemotiveLogo(
//       "/home/youcha/remoteotter/public/assets/logo.png",
//     ),
//   );
// })();

async function main() {
  // Read images as buffers
  const jobs = await prisma.job.findMany();

  for (const job of jobs) {
    const { companyLogo } = job;
    try {
      const img2 = fs.readFileSync(
        `/home/youcha/remoteotter/public${companyLogo}`,
      );
      resemble(img1)
        .compareTo(img2)
        .onComplete(async (data) => {
          if (data.misMatchPercentage <= 0) {
            await prisma.job.update({
              where: {
                id: job.id,
              },
              data: {
                companyLogo: "/assets/logo.png",
              },
            });
            console.log("match", job.companyLogo);
          }
        });
    } catch (error) {
      console.log("invalid path", job.companyLogo);
    }
  }
}

//main();

module.exports = { compareRemotiveLogo };
