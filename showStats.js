const { PrismaClient } = require("@prisma/client");

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
  const prisma = new PrismaClient();

  // Get jobs
  const jobs = await prisma.job.findMany();

  // Count each category jobs
  const categoryJobs = {};
  for (const category of remoteJobCategories) {
    categoryJobs[category.name] = jobs.filter(
      (job) => job.category === category.name,
    ).length;
  }

  // Count open jobs
  const openJobsCount = jobs.filter((job) => job.isOpen).length;

  // Log
  console.log("\n**********************\n");
  console.log("Stats fetched at: ", new Date());
  console.log("\n-----------------------\n");
  console.log("Total jobs count: ", jobs.length);
  console.log("Open jobs count: ", openJobsCount);
  console.log("Closed jobs count: ", jobs.length - openJobsCount);
  console.log("\n-----------------------\n");
  console.log("Category jobs count:");
  for (const category of remoteJobCategories) {
    console.log(`\t${category.name}: ${categoryJobs[category.name]}`);
  }
  console.log("\n-----------------------\n");

  await prisma.$disconnect();
}

main();
