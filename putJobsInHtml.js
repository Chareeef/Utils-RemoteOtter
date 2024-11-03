const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async () => {
  const jobs = await prisma.job.findMany();
  let list = "";
  for (const job of jobs) {
    list += `<li>
    <img src="${job.companyLogo.replace("/home/youcha/otter", "")}"/>
    <h1>title: ${job.title}</h1>
    <h2>category: ${job.category}</h2>
    <h3>company: ${job.companyName}</h3>
    <h4>location: ${job.location}</h4>
    <h4>job type: ${job.jobType}</h4>
    <h4>publication date: ${job.publicationDate}</h4>
    <h4>salary: ${job.salary}</h4>
    <h4>isOpen: ${job.isOpen}</h4>
    <h4>apply url:
    <a href="${job.applyUrl}">${job.applyUrl}</a>
    </h4>
    <div>${job.description}</div>
  </li>`;
  }
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>otter</title>
    <style>
      ul {
        list-style-type: none;
      }

      li {
        margin-bottom: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <h1>otter jobs</h1>
<h1>${jobs.length} Jobs</h1>
    <ul>${list}</ul>
  </body>
</html>`;
  console.log(html);
  await prisma.$disconnect();
})();
