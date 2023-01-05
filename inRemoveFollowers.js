const { Builder, By, Key, until } = require('selenium-webdriver');
const credentials = require("./credentials")
const wait = require("./services/waiter")

async function execute() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("===== STARTING LOG-IN ACTION =====")
        await login(driver);

        await wait(5)

        console.log("===== STARTING GET FOLLOWERS ACTION =====")
        await getFollowers(driver, "_cdreyer");
    } catch (e) {
        console.log("===== AN ERROR HAS OCURRED =====")
        throw new Error(e.message);
    } finally {
        driver.close()
    }
};


function login(driver) {
    return new Promise(async (resolve, reject) => {
        try {
            await driver.get('https://www.instagram.com');
            await wait(2);

            // Find the username and password fields and enter the login credentials
            await driver.findElement(By.name('username')).sendKeys(credentials.username);
            await driver.findElement(By.name('password')).sendKeys(credentials.password);
            await driver.findElement(By.xpath('//button[@type="submit"]')).click();

            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

function getFollowers(driver, username) {
    return new Promise(async (resolve, reject) => {
        try {
            driver.get(`https://www.instagram.com/${username}/`)
            await wait(3)
            await driver.findElement(By.xpath(`//a[@href="/${username}/followers/"]`)).click();
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

execute()