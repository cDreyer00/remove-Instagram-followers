require("dotenv").config()
const { Builder, By, Key } = require('selenium-webdriver');
const wait = require("cdreyer-utilities")

const login = require("./src/login")
const openFollowersModal = require("./src/openFollowers")
const getFollowersList = require("./src/followersCheck")


async function execute() {
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    
    try {
        console.log("===== STARTING LOG-IN ACTION =====")
        await login(driver);

        await wait(5)

        console.log("===== STARTING GET FOLLOWERS ACTION =====")
        await openFollowersModal(driver, "_cdreyer");

        await wait(2)
        await getFollowersList(driver);

    } catch (e) {
        console.log("===== AN ERROR HAS OCURRED =====")
        throw new Error(e.message);
    } finally {
        driver.quit()
    }
};

execute()