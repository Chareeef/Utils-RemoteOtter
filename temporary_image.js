const axios = require("axios");
const fs = require("fs");

async function downloadImage(url, filepath) {
  try {
    const response = await axios("https://api.scrapingdog.com/scrape", {
      params: {
        api_key: "672614849f1278e6126cb608",
        url,
        dynamic: "false",
      },
      responseType: "stream",
    });

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

const imageUrls = [
  {
    url: "https://remotive.com/job/1927858/logo",
    filePath: "./yellowlogo.jpg",
  },
];

async function main() {
  for (const imageUrl of imageUrls) {
    await downloadImage(imageUrl.url, imageUrl.filePath);
  }
}

main();
