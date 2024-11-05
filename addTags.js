const axios = require("axios");
const api_key = "672614849f1278e6126cb608";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    // Get jobs
    const response = await axios("https://api.scrapingdog.com/scrape", {
      params: {
        api_key,
        url: "https://remotive.com/api/remote-jobs",
        dynamic: "false",
      },
    });
    const jobs = response.data.jobs;

    // Add tags
    for (const job of jobs) {
      console.log(job.tags, job.company_logo);
      const jobExists = await prisma.job.findFirst({
        where: { remotiveUrl: job.url },
      });

      if (!jobExists) continue;

      await prisma.job.update({
        where: { remotiveUrl: job.url },
        data: { tags: job.tags, originalLogoUrl: job.company_logo },
      });
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
}
main();
