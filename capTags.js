const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const edgeCases = [
  {
    old: "saas",
    new: "SaaS",
  },
  {
    old: "llms",
    new: "LLMs",
  },
  {
    old: "json",
    new: "JSON",
  },
  {
    old: "mysql",
    new: "MySQL",
  },
  {
    old: "mongodb",
    new: "MongoDB",
  },
  {
    old: "postgresql",
    new: "PostgreSQL",
  },
  {
    old: "redis",
    new: "Redis",
  },
  {
    old: "git",
    new: "Git",
  },
  {
    old: "github",
    new: "GitHub",
  },
  {
    old: ".net",
    new: ".NET",
  },
];
const capitalizeWords = (sentences) => {
  return sentences.map((sentence) =>
    sentence
      .split(" ")
      .map((word) => {
        if (
          edgeCases.some(
            (edgeCase) => edgeCase.old === word.toLowerCase().trim(),
          )
        ) {
          return edgeCases.find(
            (edgeCase) => edgeCase.old === word.toLowerCase().trim(),
          ).new;
        } else if (word.includes("/") || word.length <= 3) {
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
if (require.main === module) {
  main();
  console.log("done");
}

module.exports = { capitalizeWords };
