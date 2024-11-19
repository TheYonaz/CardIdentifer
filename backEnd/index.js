import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';
let pokemonName = "pikachu";
let ebayPage = `https://www.ebay.com/sch/i.html?_from=R40&_nkw=${pokemonName}&_sacat=0&_pgn=1`;

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: false,
  userDataDir: "./tmp",
});
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto(ebayPage);

const products = await page.$$("#srp-river-results > ul > li.s-item");
for (const product of products) {
  let title = "null";
  let price = "null";
  let img = "null";
  try {
    title = await page.evaluate(
      (el) =>
        el.querySelector("div > div.s-item__info.clearfix > a > div > span")
          .textContent,
      product
    );
  } catch (error) {
    console.log(error);
  }
  try {
    price = await page.evaluate(
      (el) =>
        el.querySelector(
          "div > div.s-item__info.clearfix > div.s-item__details.clearfix > div.s-item__details-section--primary > div:nth-child(1) > span"
        ).textContent,
      product
    );
  } catch (error) {
    console.log(error);
  }
  try {
    img = await page.evaluate(
      (el) =>
        el
          .querySelector(
            "div > div.s-item__image-section > div > a > div > img"
          )
          .getAttribute("src"),
      product
    );
  } catch (error) {
    console.log(error);
  }
  console.log({ title, price, img });
}

// // Type into search box.
// await page.locator(".devsite-search-field").fill("automate beyond recorder");

// // Wait and click on first result.
// await page.locator(".devsite-result-item-link").click();

// // Locate the full title with a unique string.
// const textSelector = await page
//   .locator("text/Customize and automate")
//   .waitHandle();
// const fullTitle = await textSelector?.evaluate((el) => el.textContent);
// //await page.screenshot({ path: "example.png" });

// // Print the full title.
// //console.log('The title of this blog post is "%s".', fullTitle);

// await browser.close();
