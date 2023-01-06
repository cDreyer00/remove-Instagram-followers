const { By } = require('selenium-webdriver');
const wait = require("cdreyer-utilities")

function getFollowersList(driver) {
    return new Promise(async (resolve, reject) => {
        try {
            const fl_elementsParent = await driver.findElements(By.xpath(`//div[@class="_ab8w  _ab94 _ab97 _ab9f _ab9k _ab9p  _ab9- _aba8 _abcm"]`))

            const names = await notFollowingBack(fl_elementsParent);
            console.log(names);

        } catch (e) {
            reject(e);
        }
    })
}

async function notFollowingBack(parents) {
    let names = [];

    for (const element of parents) {
        try {
            await element.findElement(By.xpath(`.//div[@class="_aacl _aacn _aacw _aad6"]`));
            let n = await element.findElement(By.xpath(`.//div[@class=" _ab8y  _ab94 _ab97 _ab9f _ab9k _ab9p _abcm"]`));

            names.push(await n.getText());
        } catch (e) {
            continue;
        }
    }
    return names;
}

module.exports = getFollowersList