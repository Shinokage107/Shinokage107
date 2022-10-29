const Mustache = require("mustache");
const fs = require("fs");
const MUSTACHE_MAIN_DIR = "./main.mustache";
const puppeteerService = require("./services/puppeteer.service");

let DATA = {
  name: "Alexander",
  date: new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: "Europe/Stockholm",
  }),
};

function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync("README.md", output);
  });
}

async function setInstagramPosts() {
  const instagramImages =
    await puppeteerService.getLatestInstagramPostsFromAccount(
      "visitstockholm",
      3
    );
  DATA.img1 = instagramImages[0];
  DATA.img2 = instagramImages[1];
  DATA.img3 = instagramImages[2];
}

async function action() {
  await setInstagramPosts();
  generateReadMe();

  await puppeteerService.close();
}
