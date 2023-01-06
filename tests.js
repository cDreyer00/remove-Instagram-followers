const { Builder, By, Key, until } = require('selenium-webdriver');
const wait = require("cdreyer-utilities")
require("dotenv").config()

async function execute() {
    const driver = await new Builder().forBrowser('chrome').build();

    driver.get("https://www.youtube.com/");

    const chanelChecks = await driver.findElements(By.xpath('//yt-icon[@class="style-scope ytd-badge-supported-renderer"]'))

    const allChanelNames = await driver.findElements(By.xpath('//a[@class="yt-simple-endpoint style-scope yt-formatted-string"]'))

    const checkedChanelNames = await chanelChecks[0].findElements(By.xpath('.//a[@class="style-scope ytd-badge-supported-renderer"]'))

    console.log(allChanelNames.length);
    allChanelNames.map(async item => console.log(await item.getText()))
    console.log(checkedChanelNames.length);

}

execute();