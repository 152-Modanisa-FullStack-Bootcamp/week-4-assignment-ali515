const { Given, When, Then } = require("cucumber");
const openUrl = require("../support/action/openUrl");
const waitForSelector = require("../support/action/waitForSelector");
const checkContainsText = require("../support/check/checkContainsText");

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
/*
Given('that User is on Video Site Project\'s HomePage', async function () {
    await openUrl.call(this, '/')
});

When('User clicks {string} video', async function (title) {
    console.log(title)
    throw new Error()
})

Then('User should see watch url correctly', async function () {
    throw new Error();
})

When('User hovers {string} video', async function (title) {
    console.log(title)
    throw new Error();
})

Then('User should see hovered image', async function () {
    throw new Error();
})
*/
