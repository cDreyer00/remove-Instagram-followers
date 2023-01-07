const { Builder, By, Key, until } = require('selenium-webdriver');
const wait = require("cdreyer-utilities")
require("dotenv").config()

async function execute() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.manage().window().maximize();

        driver.get("https://www.youtube.com/");
        await wait(5);
        await driver.executeScript(`
            let content = document.querySelector("#content");
            window.scrollTo(0, content.scrollHeight);
        `);
        await wait(5);
    } finally {
        //driver.quit();
    }
}

execute();