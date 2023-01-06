const { By } = require('selenium-webdriver');
const wait = require("cdreyer-utilities")

function login(driver) {
    return new Promise(async (resolve, reject) => {
        try {
            await driver.get('https://www.instagram.com');
            await wait(2);

            // Find the username and password fields and enter the login credentials
            await driver.findElement(By.name('username')).sendKeys(process.env.IN_USERNAME);
            await driver.findElement(By.name('password')).sendKeys(process.env.IN_PASSWORD);
            await driver.findElement(By.xpath('//button[@type="submit"]')).click();

            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = login