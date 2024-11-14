const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");
const countries = require("./countries");
// Configure the transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your SMTP host
  port: 465, // Replace with SMTP port (often 465 for SSL, or 587 for TLS)
  secure: true, // Use true for SSL (465) or false for TLS (587)
  auth: {
    user: "team@remoteotter.com",
    pass: "rdrjwodgavmrqkay", // Replace with the actual password or use an app-specific password if available
  },
});
const prisma = new PrismaClient();

const jobDict = {
  full_time: "Full Time",
  part_time: "Part Time",
  contract: "Contract",
  internship: "Internship",
  freelance: "Freelance",
};

// Date Helper Function
function formatDate(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  // Add ordinal suffix
  const ordinalSuffix = (n) => {
    if (n > 3 && n < 21) return "th"; // Handles 11th - 13th
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${dayName}, ${dayOfMonth}${ordinalSuffix(dayOfMonth)} of ${monthName}`;
}

// helper function to get URL params
function getParams(url) {
  // Create a URL object
  const urlObj = new URL(url);

  // Use URLSearchParams to get parameters
  const queryParams = new URLSearchParams(urlObj.search);

  const query = queryParams.get("query");
  const categories = queryParams.get("categories").replaceAll(",", "/");
  const jobTypes = queryParams
    .get("jobTypes")
    .split(",")
    .map((type) => jobDict[type])
    .join("/");
  const location = countries.find(
    (country) => queryParams.get("location")?.toLowerCase() === country.id,
  )?.name;

  return {
    query: query,
    categories: categories,
    jobTypes: jobTypes,
    location: location,
  };
}

async function main() {
  const subscriptions = await prisma.subscription.findMany();
  for (const subscription of subscriptions) {
    const { query, location, categories, jobTypes } = getParams(
      subscription.query,
    );
    const response = await fetch(subscription.query, {
      headers: {
        "X-API-KEY":
          "2ac367c60037093f7a5021975951e31fb94dfb8d0e83aeb60d6a4aa8cc996987",
      },
    });
    let jobs = await response.json();
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    jobs = jobs.filter((job) => new Date(job.publicationDate) > twoDaysAgo);
    if (jobs.length === 0) {
      console.log(
        `No jobs found for query: ${query}, location: ${location}, categories: ${categories}, jobTypes: ${jobTypes}`,
      );
      continue;
    }
    const mailOptions = {
      from: '"RemoteOtter Team" <team@remoteotter.com>', // sender address
      to: subscription.email, // list of receivers
      subject: "New Jobs Just For You! Be the First to Get Noticed! 🦦", // Subject line
      text: "Your Weekly Job Alert! 🦦", // plain text body
      html: `
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Weekly Job Alert! 🦦</title>
          <style>
              /* FONT IMPORT */
              @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap');


              body {
                  font-family: "Host Grotesk", Arial, sans-serif;
                  margin: 0;
                  padding: 0;
              }

              .container {
                  max-width: 493px;
                  margin: auto;
                  background: #fff;
                  padding: 16px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }


              .footer {
                  text-align: center;
                  margin-top: 20px;
              }

              .social-links img {
                  width: 24px;
                  margin: 0 10px;
              }

              .banner-image-container {
                  max-width: 525px;
                  margin: auto;

              }

              .banner-image {
                  width: 100%;
                  height: 100%;
                  border-top-right-radius: 20px;
                  border-top-left-radius: 20px;
              }

              .title {
                  font-size: 24px;
              }

              p span {
                  font-weight: bold;
              }

              .single-icon-text {
                  display: inline-block;
                  align-items: center;
                  margin-right: 12px;
                  background: #f0f0f0;
                  padding: 4px 12px;
                  border-radius: 16px;
                  margin-bottom: 8px;
              }

              .single-icon-text p {
                  font-size: 12px;
                  margin: 0;
              }

              .icon-texts {
                  display: inline-block;
                  margin-bottom: 12px;
              }

              .job-image {
                  height: 30px;
                  width: 30px;
                  margin-right: 16px;
                  border-radius: 100%;
                  background-color: white;
              }

              .job-list {
                  margin-top: 20px;
              }

              .job-item {
                  border: 1px solid #ddd;
                  margin-bottom: 15px;
                  padding: 15px;
                  border-radius: 16px;
                  background-color: #f9f9f9;
                  display: flex;
                  align-items: start;
              }

              .job-title {
                  font-weight: bold;
                  font-size: 16px;
              }

              .job-company {
                  font-size: small;
              }

              .job-details {
                  margin-top: 8px;
                  font-size: 14px;
                  color: #666;
                  display: inline-block;
              }

              .job-button {
                  background-color: #707070;
                  color: #fff;
                  border: none;
                  padding: 4px 12px;
                  border-radius: 4px;
                  cursor: pointer;
              }

              .job-tags {
                  margin-top: 8px;
              }

              .job-tag {
                  background-color: #f0f0f0;
                  padding: 4px 12px;
                  border-radius: 8px;
                  margin-right: 8px;
                  margin-bottom: 8px;
                  font-size: 12px;
                  display: inline-block;
              }

              .unsubscribe {
                  font-size: small;
              }
          </style>
      </head>

      <body>
          <div style="width:100%;background-color:#f9fafb;margin:auto;padding-top:24px;padding-bottom:24px;">
              <div class="banner-image-container">
                  <img class="banner-image" src="https://remoteotter.com/emails/EmailBanner.png" />
              </div>
              <div class="container">
                  <!-- NAME OF USER -->
                  <h1 class="title">Hello ${subscription.name},</h1>

                  <!-- DATE OF EMAIL -->
                  <p>Here are the latest job listings for <span>${formatDate(new Date())}</span>:</p>    
                  <div class="icon-texts">
                      ${query !== ""
          ? `
                        <div class="single-icon-text">
                            <p>${query}</p>
                        </div>
                      `
          : ""
        }
                      ${categories !== ""
          ? `
                        <div class="single-icon-text">
                            <p>${categories}</p>
                        </div>
                        `
          : ""
        }
                      ${location !== undefined && location !== ""
          ? `
                        <div class="single-icon-text">
                            <p>${location}</p>
                        </div>
                        `
          : ""
        }
                      ${jobTypes !== ""
          ? `
                      <div class="single-icon-text">
                          <p>${jobTypes}</p>
                      </div>
                      `
          : ""
        }
                  </div>

                  <div class="job-list">
                  ${jobs
          .map(
            (job) => `
                    
                    <a href="https://remoteotter.com/company/${job.companyName.replace(" ", "-")}/jobs/${job.title.replace(" ", "-")}_${job.id}" style="text-decoration:none;color:inherit;">
                          <div class="job-item">
                              <img src="https://remoteotter.com${job.companyLogo.replaceAll(" ", "%20").replaceAll(",", "%2C")}" class="job-image" />
                              <div style="width:100%;">
                                  <div>
                                      <div>
                                          <div class="job-title">${job.title}</div>
                                          <div class="job-company">${job.companyName}</div>
                                      </div>
                                  </div>
                                  <div class="job-tags">
                                      ${job.tags
                .slice(0, 4)
                .map(
                  (tag) =>
                    `<div class="job-tag">${tag}</div>`,
                )
                .join("")}
                                  </div>
                                  <div class="job-details">
                                      <div
                                          style="display:inline-block; margin-right:8px; margin-bottom: 8px; vertical-align:middle;">
                                          <img src="https://remoteotter.com/emails/target.png"
                                              style="height:16px; width:16px; vertical-align:middle;" />
                                          <span
                                              style="margin:0; margin-left:4px; font-size:12px; vertical-align:middle;">${job.category}</span>
                                      </div>
                                      <div
                                          style="display:inline-block; margin-right:8px; margin-bottom: 8px; vertical-align:middle;">
                                          <img src="https://remoteotter.com/emails/map-pin.png"
                                              style="height:16px; width:16px; vertical-align:middle;" />
                                          <span
                                              style="margin:0; margin-left:4px; font-size:12px; vertical-align:middle;">${job.location}</span>
                                      </div>
                                      <div
                                          style="display:inline-block; margin-right:8px; margin-bottom: 8px; vertical-align:middle;">
                                          <img src="https://remoteotter.com/emails/briefcase.png"
                                              style="height:16px; width:16px; vertical-align:middle;" />
                                          <span style="margin:0; margin-left:4px; font-size:12px; vertical-align:middle;">${jobDict[job.jobType]}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </a>
                    `,
          )
          .join("")}
                  </div>

                  <div class="footer">
                      <p>Best of luck with your applications!</p>
                      <p>RemoteOtter Team</p>
                      <a href="https://remoteotter.com/unsubscribe/${subscription.id}" class="unsubscribe">unsubscribe</a>
                  </div>
              </div>
          </div>
      </body>

      </html>
      `, // html body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error sending email:", error);
      }
      console.log("Email sent:", info.response);
    });
  }

  await prisma.$disconnect();
  console.log("Emails sent");
  console.log("----\n");
}

console.log(`----\nSending emails for ${formatDate(new Date())}\n----`);
main();
