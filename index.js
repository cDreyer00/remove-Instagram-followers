require("dotenv").config()
const wait = require("cdreyer-utilities")
const { Builder, By, Key } = require('selenium-webdriver');

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

        await wait(35);

        console.log("===== STARTING GET FOLLOWERS ACTION =====")
        await openFollowersModal(driver, "_cdreyer");
        await wait(2)

        let fl_modal = await driver.executeScript(`return document.querySelector("._aano")`);

        let modalScroll_current = await driver.executeScript(`return arguments[0].scrollTop`, fl_modal);
        let modalScroll_total = await driver.executeScript(`return arguments[0].scrollHeight`, fl_modal);
        // console.log(modalScroll_total - modalScroll_current);
        console.log(modalScroll_total);
        console.log(modalScroll_current);

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