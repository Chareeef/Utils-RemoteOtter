const axios = require("axios");
const fs = require("fs");

async function downloadImageOriginal(url, filepath) {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(filepath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading the image:", error.status);
  }
}

async function downloadImage(targetUrl, filepath) {
  const apiKey = "D0xVwj1tPIth9CLS8uHKwDP3BbUJ2Ij4";
  const url = "https://api.webscrapingapi.com/v2";

  try {
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
        url: targetUrl,
      },
    });

    // Step 1: Remove the `data:image/png;base64,` prefix
    const base64Data = response.data.base64_string.replace(
      /^data:image\/\w+;base64,/,
      "",
    );

    // Step 2: Convert the Base64 string to a binary buffer
    const imageBuffer = Buffer.from(base64Data, "base64");

    // Step 3: Write the buffer to a file
    fs.writeFile("output.png", imageBuffer, (err) => {
      if (err) {
        console.error("Error writing image file:", err);
      } else {
        console.log("Image file saved as output.png");
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

const imageUrls = [
  {
    //    url: "https://remotive.com/job/1927858/logo",
    url: "https://remotive.com/web/image/hr.job/1927858/logo/128x128",
    filePath: "./companies/yellowlogo.jpg",
  },
];

async function main() {
  for (const imageUrl of imageUrls) {
    await downloadImage(imageUrl.url, imageUrl.filePath);
  }
}

main();
