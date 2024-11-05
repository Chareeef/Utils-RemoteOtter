const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const capitalizeWords = (sentences) => {
  return sentences.map((sentence) =>
    sentence
      .split(" ")
      .map((word) => {
        if (word.includes("/")) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" "),
  );
};

async function main() {
  const jobs = await prisma.job.findMany({
    where: {
      tags: {
        isEmpty: false,
      },
    },
  });
  for (const job of jobs) {
    const newTags = capitalizeWords(job.tags);
    await prisma.job.update({
      where: {
        id: job.id,
      },
      data: {
        tags: newTags,
      },
    });
  }
}
//main();
//
module.exports = { capitalizeWords };
