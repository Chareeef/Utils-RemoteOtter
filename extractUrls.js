const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const urls = [];
(async () => {
  const jobs = await prisma.job.findMany();
  for (const job of jobs) {
    urls.push(job.applyUrl);
  }
  // Extract unique domains
  const uniqueDomains = new Set(
    urls
      .map((url) => {
        try {
          return new URL(url).hostname; // Extract hostname
        } catch (error) {
          console.error(`Invalid URL: ${url}`);
          return null;
        }
      })
      .filter(Boolean), // Remove null values from invalid URLs
  );

  // Convert Set to an array if needed
  const domainsArray = Array.from(uniqueDomains);

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apply Domains</title>
</head>
<body>
`;
  for (const domain of domainsArray) {
    html += `<a href="https://${domain}">${domain}</a><br>`;
  }
  html += `</body>
</html>`;
  console.log(html);
})();
