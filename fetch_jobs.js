const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { compareRemotiveLogo } = require("./compareRemotiveLogo");

// Get the prisma client
const prisma = new PrismaClient();

// Jobs Remotive URLs
const remotiveUrls = [];

// Created and skipped jobs count
let createdJobsCount = 0;
let skippedJobsCount = 0;

async function downloadImage(url, filepath) {
  try {
    const response = await axios.get("https://api.scrapingdog.com/scrape", {
      params: {
        api_key: "672614849f1278e6126cb608",
        url,
        dynamic: "false",
      },
      responseType: "arraybuffer",
    });

    // Create a write stream to save the image
    const writer = fs.createWriteStream(filepath);

    // Write the binary data to the file
    writer.write(response.data);
    writer.end();

    console.log("Image downloaded", filepath);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading the image:", error.status);
  }
}

async function getApplyUrl(url) {
  try {
    // Get the job page
    const response = await axios.get("https://api.scrapingdog.com/scrape", {
      params: {
        api_key: "672614849f1278e6126cb608",
        url,
        dynamic: "false",
      },
    });
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
    return null;
  }
}

async function getJobs() {
  console.log("\n-----------------------\n");
  console.log(`Fetching jobs...`);

  // Get jobs
  // const response = await axios.get(
  //   `https://remotive.com/api/remote-jobs?category=${slug}`,
  // );

  try {
    const response = await axios.get("https://api.scrapingdog.com/scrape", {
      params: {
        api_key: "672614849f1278e6126cb608",
        url: "https://remotive.com/api/remote-jobs",
        dynamic: "false",
      },
    });

    // Get jobs
    const jobs = response.data.jobs;

    for (const job of jobs) {
      try {
        remotiveUrls.push(job.url);
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
          console.log(`Inacceptable applyUrl: ${applyUrl}, skipping...`);
          skippedJobsCount++;
          continue;
        }

        // Verify if job already fetched
        // if (fetchedJobsApplyUrls.includes(applyUrl)) {
        //   skippedJobsCount++;
        //   continue;
        // }

        // Add applyUrl to fetchedJobsApplyUrls
        // fetchedJobsApplyUrls.push(applyUrl);

        // Verify if job already exists by checking the applyUrl in the database
        const existingJob = await prisma.job.findFirst({
          where: {
            applyUrl,
          },
        });

        if (existingJob) {
          skippedJobsCount++;
          continue;
        }

        // Download company logo
        const companyName = job.company_name
          .replace("&amp;", "&")
          .replace("&#39;", "'")
          .replace(new RegExp("&.*;", "g"), "_");
        const filepath = `./companies/${companyName}.jpg`;
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
        };

        console.log("Job url:", jobInfo.applyUrl);
        await prisma.job.create({ data: jobInfo });
        console.log("Job created:", jobInfo.title);
        createdJobsCount++;
      } catch (error) {
        console.error("Error:", error);
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
          isOpen: remotiveUrls.includes(job.applyUrl) ? true : false,
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
  console.log("Total requests count: ", remotiveUrls.length);
  console.log("Skipped jobs count: ", skippedJobsCount);
  console.log("Created jobs count: ", createdJobsCount);
  console.log("Jobs currently in database: ", jobs.length);
  console.log("Open jobs count: ", openJobsCount);
  console.log("Closed jobs count: ", jobs.length - openJobsCount);
  console.log("\n-----------------------\n");

  await prisma.$disconnect();
}

main();
