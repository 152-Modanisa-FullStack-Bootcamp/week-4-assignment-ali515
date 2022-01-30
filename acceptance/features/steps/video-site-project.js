const { Given, When, Then } = require("cucumber");
const openUrl = require("../support/action/openUrl");
const waitFor = require("../support/action/waitFor");
const waitForSelector = require("../support/action/waitForSelector");
const checkUrlContains = require("../support/check/checkUrlContains");

Given("that User goes to Video Site Project's HomePage", async function () {
  await openUrl.call(this, "/");
});

When("page is loaded", async function () {
  await waitForSelector.call(this, "#video-container");
});

Then("User can see some of videos' title like", async function ({ rawTable }) {
  const selector = ".video .title";
  const titles = rawTable.map((x) => x[0]);
  const elements = await this.page.$$eval(
    selector,
    (elements, titles) => elements.filter((x) => titles.includes(x.innerText)),
    titles
  );
  if (elements.length !== titles.length) throw new Error();
});

Given("that User is on Video Site Project's HomePage", async function () {
  await openUrl.call(this, "/");
});

When("User clicks {string} video", async function (title) {
  const selector = ".video .title";
  const videoId = await this.page.$$eval(
    selector,
    (elements, title) => {
      const titleElement = elements.find((x) => x.innerText === title);
      const videoElement = titleElement.closest(".video");
      const id = videoElement.dataset["id"];
      videoElement.click();
      return id;
    },
    title
  );
  this.videoUrl = `/watch/${videoId}`;
});

Then("User should see watch url correctly", async function () {
  const selector = "#watch";
  await checkUrlContains.call(this, false, this.videoUrl);
  await waitForSelector.call(this, selector);
});

When("User hovers {string} video", async function (title) {
  this.hoverTest = {
    hoverImage: "",
    coverImage: "",
    image: "",
  };
  const selector = `.video[data-title*="${title}"] img`;
  this.hoverTest.hoverImage = await this.page.$eval(
    selector,
    (element) => element.dataset["hoverImage"]
  );
  if (!this.hoverTest.hoverImage) throw new Error("data-hover-image not found");
  const img = await this.page.$(selector);
  this.hoverTest.coverImage = await (await img.getProperty("src")).jsonValue();
  await img.hover();
  this.hoverTest.image = await (await img.getProperty("src")).jsonValue();
});

Then("User should see hovered image", async function () {
  const { hoverImage, image, coverImage } = this.hoverTest;
  if (!hoverImage || !image || !coverImage)
    throw new Error("Test invalid");
  else if (hoverImage !== image) throw new Error("Hover Test invalid");
});
