const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Get the prisma client
const prisma = new PrismaClient();

// Sleep function
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/*
async function getApplyUrl(url, sleepTime = 2) {
  try {
    // Get the job page
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Get the apply url from the job page
    const applyAnchor = $(
      'span.tw-flex.tw-w-full.tw-rounded-md.tw-shadow-sm > a.remotive-btn-chocolate[href^="https://"]',
    );
    const applyUrl = applyAnchor
      .attr("href")
      .replace("utm_source=remotive.com", "utm_source=remoteotter.com")
      .replace("ref=remotive.com", "ref=remoteotter.com");

    // Return the apply url
    return applyUrl;
  } catch (error) {
    console.error("Error fetching apply url:", error.status);

    if (error.status === 429 && sleepTime < 10) {
      //  Sleep
      console.log(`Too many requests, sleeping for ${sleepTime} minutes...`);
      await sleep(sleepTime * 60 * 1000);
      return getApplyUrl(url, sleepTime + 1);
    } else if (error.status === 429) {
      return -1;
    }

    return null;
  }
}*/

async function putPlaceholders(slug) {
  console.log("\n-----------------------\n");

  // Get jobs
  const response = await axios.get(
    `https://remotive.com/api/remote-jobs?category=${slug}`,
  );

  // Sleep
  await sleep(600);

  // Get jobs
  const jobs = response.data.jobs;

  for (const job of jobs) {
    console.log(
      job.company_logo,
      job.company_name.replace(new RegExp("&.*;", "g"), "_"),
    );
  }
}

async function main() {
  const remoteJobCategories = [
    { name: "Software Development", slug: "software-dev" },
    { name: "DevOps / Sysadmin", slug: "devops" },
    { name: "Data Analysis", slug: "data" },
    { name: "QA", slug: "qa" },
    { name: "Design", slug: "design" },
    { name: "Finance / Legal", slug: "finance-legal" },
    { name: "Customer Service", slug: "customer-support" },
    { name: "Marketing", slug: "marketing" },
    { name: "Sales / Business", slug: "sales-business" },
    { name: "Product", slug: "product" },
    { name: "Project Management", slug: "project-management" },
    { name: "Human Resources", slug: "hr" },
    { name: "Writing", slug: "writing" },
    { name: "All others", slug: "all-others" },
  ];

  // Get jobs
  for (const category of remoteJobCategories) {
    await putPlaceholders(category.slug);
  }

  // Flag jobs availability
  //const jobs = await prisma.job.findMany();

  await prisma.$disconnect();
}

main();
