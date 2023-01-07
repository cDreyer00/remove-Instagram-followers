const { By } = require('selenium-webdriver');
const wait = require("cdreyer-utilities")

function getFollowersList(driver, previousHeight) {
    if (previousHeight == undefined) previousHeight = 0;

    return new Promise(async (resolve, reject) => {
        try {
            const fl_elementsParent = await driver.findElements(By.xpath(`//div[@class="_ab8w  _ab94 _ab97 _ab9f _ab9k _ab9p  _ab9- _aba8 _abcm"]`))

            resolve(await notFollowingBack(fl_elementsParent));

        } catch (e) {
            reject(e);
        }
    })
}


async function notFollowingBack(parents) {
    let names = [];
    let rmButtons = [];

    for (const element of parents) {
        try {
            await element.findElement(By.xpath(`.//div[@class="_aacl _aacn _aacw _aad6"]`));
            let n = await element.findElement(By.xpath(`.//div[@class=" _ab8y  _ab94 _ab97 _ab9f _ab9k _ab9p _abcm"]`));
            let rmbtn = await element.findElement(By.xpath(`.//button[@class="_acan _aiit _acap _aijb _acat _aj1-"]`));

            rmButtons.push(rmbtn);
            names.push(await n.getText());
        } catch (e) {
            continue;
        }
    }

    return {
        names,
        rmButtons
    }
}

module.exports = getFollowersList