require("dotenv").config()
const wait = require("cdreyer-utilities")
const { Builder, By, Key, until } = require('selenium-webdriver');

const login = require("./src/login")
const openFollowersModal = require("./src/openFollowers")
const getFollowersList = require("./src/followersCheck")
const removeFollowers = require("./src/removeFollowers")


async function execute() {
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();

    try {
        console.log("===== STARTING LOG-IN ACTION =====")
        await login(driver);

        //await wait(5);
        await driver.wait(until.elementLocated(By.xpath(`//img[contains(@alt, '${process.env.IN_USERNAME}')]`)), 60 * 1000);

        console.log("===== STARTING GET FOLLOWERS ACTION =====")
        await openFollowersModal(driver, process.env.IN_USERNAME);
        await wait(4);


        let fl_modal = await driver.executeScript(`return document.querySelector("._aano")`);

        let modalScroll_current = await driver.executeScript(`return arguments[0].scrollTop`, fl_modal);
        let modalScroll_total = await driver.executeScript(`return arguments[0].scrollHeight`, fl_modal);

        while ((modalScroll_total - modalScroll_current) > 400) {

            await driver.executeScript(`arguments[0].scrollTo(0, arguments[0].scrollHeight);`, fl_modal);

            const followers = await getFollowersList(driver);
            await removeFollowers(followers);
            await wait(1.5);
            modalScroll_current = await driver.executeScript(`return arguments[0].scrollTop`, fl_modal);
            modalScroll_total = await driver.executeScript(`return arguments[0].scrollHeight`, fl_modal);

        }

    } catch (e) {
        console.log("===== AN ERROR HAS OCURRED =====")
        throw new Error(e.message);
    } finally {
        driver.quit()
    }
};

execute();