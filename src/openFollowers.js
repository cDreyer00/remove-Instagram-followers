const { By } = require('selenium-webdriver');
const wait = require("cdreyer-utilities")

function openFollowersModal(driver, username) {
    return new Promise(async (resolve, reject) => {
        try {
            driver.get(`https://www.instagram.com/${username}/followers`)
            await wait(3)
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = openFollowersModal