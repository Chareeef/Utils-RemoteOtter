const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { compareRemotiveLogo } = require("./compareRemotiveLogo");
const { capitalizeWords } = require("./capTags");

// Get the prisma client
const prisma = new PrismaClient();

// Jobs Remotive URLs
const remotiveUrls = [];

// Created and skipped jobs count
let createdJobsCount = 0;
let skippedJobsCount = 0;
let requestsCount = 0;

// scrapingdog API key
const api_key = process.env.SCRAPINGDOG_API_KEY;

// Sleep function
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function downloadImage(url, filepath) {
  try {
    const response = await axios("https://api.scrapingdog.com/scrape", {
      params: {
        api_key,
        url,
        dynamic: "false",
      },
      responseType: "stream",
    });
    requestsCount++;

    const writer = fs.createWriteStream(filepath);

    response.data.pipe(writer);

    console.log("Image downloaded", filepath);
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
}

async function getApplyUrl(url, sleepTime = 2) {
  try {
    // Get the job page
    const response = await axios("https://api.scrapingdog.com/scrape", {
      params: {
        api_key,
        url,
        dynamic: "false",
      },
    });
    console.log(`Fetching apply url... ${url}`);
    requestsCount++;

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
}

async function getJobs() {
  console.log("\n-----------------------\n");
  console.log(`Fetching jobs...`);

  try {
    // Get jobs
    const response = await axios("https://api.scrapingdog.com/scrape", {
      params: {
        api_key,
        url: "https://remotive.com/api/remote-jobs",
        dynamic: "false",
      },
    });
    requestsCount++;

    // Get jobs
    const jobs = response.data.jobs;

    for (const job of jobs) {
      try {
        // Skip if the job url is blacklisted
        const blacklistedUrl = await prisma.blackListUrl.findFirst({
          where: { url: job.url },
        });

        if (blacklistedUrl) {
          skippedJobsCount++;
          continue;
        }

        // Add remotive url
        remotiveUrls.push(job.url);

        // Check if job already exists
        const jobExists = await prisma.job.findFirst({
          where: { remotiveUrl: job.url },
        });

        if (jobExists) {
          skippedJobsCount++;
          continue;
        }

        // Get apply url
        const applyUrl = await getApplyUrl(job.url);

        // Break if applyUrl is -1
        if (applyUrl === -1) {
          console.log("We've encountered a server error...\nBREAKING OUT");
          break;
        }

        // Ignore if the applyUrl starts with "https://remotive.com" or "https://www.remotive.com" or null
        if (
          !applyUrl ||
          applyUrl.startsWith("https://remotive.com") ||
          applyUrl.startsWith("https://www.remotive.com")
        ) {
          console.log("blacklisted applyUrl: ", applyUrl);
          await prisma.blackListUrl.create({
            data: {
              id: uuidv4(),
              url: job.url,
            },
          });
          skippedJobsCount++;
          continue;
        }

        // Verify if job already exists by checking the applyUrl in the database
        const existingJob = await prisma.job.findFirst({
          where: {
            applyUrl,
          },
        });

        if (existingJob) {
          console.log("Skipping job with existing applyUrl:", applyUrl);
          await prisma.blackListUrl.create({
            data: {
              id: uuidv4(),
              url: job.url,
            },
          });
          skippedJobsCount++;
          continue;
        }

        // Download company logo
        const companyName = job.company_name
          .replace("&amp;", "&")
          .replace("&#39;", "'")
          .replace(new RegExp("&.*;", "g"), "_");
        const filepath = `/companies/${companyName}.jpg`;
        await downloadImage(job.company_logo, filepath);
        const isRemotiveLogo = await compareRemotiveLogo(filepath);
        let companyLogo = "";
        if (!isRemotiveLogo) {
          companyLogo = filepath;
        } else {
          await fs.promises.unlink(filepath);
          companyLogo = "/assets/logo.png";
        }

        // Create job object
        const jobInfo = {
          id: uuidv4(),
          title: job.title,
          category: job.category,
          companyName,
          companyLogo,
          location: job.candidate_required_location,
          publicationDate: new Date(job.publication_date),
          description: job.description,
          jobType: job.job_type,
          salary: job.salary,
          applyUrl: applyUrl,
          remotiveUrl: job.url,
          originalLogoUrl: job.company_logo,
          tags: capitalizeWords(job.tags),
        };

        await prisma.job.create({ data: jobInfo });
        console.log("Job created:", jobInfo.title);
        createdJobsCount++;
      } catch (error) {
        skippedJobsCount++;
      }
    }
    return jobs;
  } catch (e) {
    console.error(e);
  }
}

async function flagJobsAvailability(jobs) {
  // Update the availability of each job in the database
  try {
    console.log("Flagging jobs availability...");
    for (const job of jobs) {
      await prisma.job.update({
        where: {
          id: job.id,
        },
        data: {
          isOpen: remotiveUrls.includes(job.remotiveUrl) ? true : false,
        },
      });
    }
    console.log("Jobs availability updated.");
  } catch (error) {
    console.error("Error updating jobs availability:", error);
  }
}

async function main() {
  // Start
  const startTime = Date.now();
  console.log("\n**********************\n");
  console.log("Job fetching process started at: ", new Date(startTime));
  console.log("\n-----------------------\n");

  // Get jobs
  await getJobs();

  // Flag jobs availability
  const jobs = await prisma.job.findMany();
  await flagJobsAvailability(jobs);
  const openJobsCount = jobs.filter((job) => job.isOpen).length;

  // Log
  console.log("\n**********************\n");
  const endTime = Date.now();
  console.log("Job fetching process completed at: ", new Date(endTime));
  console.log(
    "Job fetching process took: ",
    (endTime - startTime) / 60000,
    " minutes",
  );
  console.log("Requests count: ", requestsCount);
  console.log("Skipped jobs count: ", skippedJobsCount);
  console.log("Created jobs count: ", createdJobsCount);
  console.log("Jobs currently in database: ", jobs.length);
  console.log("Open jobs count: ", openJobsCount);
  console.log("Closed jobs count: ", jobs.length - openJobsCount);
  console.log("\n-----------------------\n");

  await prisma.$disconnect();
}

main();
