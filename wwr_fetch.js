const axios = require("axios");
const cheerio = require("cheerio");

const fetchJobsLinks = async () => {
  const rssFeeds = [
    "https://weworkremotely.com/categories/remote-customer-support-jobs.rss", // Customer Support
    "https://weworkremotely.com/categories/remote-product-jobs.rss", // Product Jobs
    "https://weworkremotely.com/categories/remote-full-stack-programming-jobs.rss", // Full-Stack Programming
    "https://weworkremotely.com/categories/remote-back-end-programming-jobs.rss", // Back-End Programming
    "https://weworkremotely.com/categories/remote-front-end-programming-jobs.rss", // Front-End Programming
    "https://weworkremotely.com/categories/remote-programming-jobs.rss", // All Programming
    "https://weworkremotely.com/categories/remote-sales-and-marketing-jobs.rss", // Sales and Marketing
    "https://weworkremotely.com/categories/remote-management-and-finance-jobs.rss", // Management and Finance
    "https://weworkremotely.com/categories/remote-design-jobs.rss", // Design
    "https://weworkremotely.com/categories/remote-devops-sysadmin-jobs.rss", // Devops and System Admin
    "https://weworkremotely.com/categories/all-other-remote-jobs.rss", // All other
  ];
  const links = [];

  for (const rssFeed of rssFeeds) {
    try {
      const response = await axios.get(rssFeed);
      const html = response.data;
      const $ = cheerio.load(html);
      const linksItems = $("item link");
      linksItems.each((index, link) =>
        links.push(link.next.data.split("\n")[0]),
      );
    } catch (error) {
      console.error("Error fetching jobs links:", error);
    }
  }

  return links;
};

const fetchPage = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const script = $('script[type="application/ld+json"]');
    const jobInfos = JSON.parse(script.text());
    const applyAnchor = $("a#job-cta-alt");
    job = {
      title: jobInfos.name,
      company: jobInfos.hiringOrganization.name,
      location: jobInfos.hiringOrganization.address.addressLocality,
      datePosted: jobInfos.datePosted,
      validThrough: jobInfos.validThrough,
      image: jobInfos.image,
      description: jobInfos.description,
      applyUrl: applyAnchor.attr("href"),
    };
    return job;
  } catch (error) {
    console.error("Error fetching page:", error);
  }
};

async function main() {
  const links = await fetchJobsLinks();
  const jobs = [];
  for (const link of links) {
    const job = await fetchPage(link);
    jobs.push(job);
  }
  console.log(jobs.slice(0, 20));
  console.log(jobs.length);
}

main();
