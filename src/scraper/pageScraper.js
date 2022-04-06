const fs = require('fs');
const path = require('path');
const telegramBot = require('../notify/notifier');

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

const pageScraper = {
	url: 'https://www.turnonet.com/2010-club-argentino-de-karting-ac/disponibilidad/3106-alquiler-de-karting',
	async scrape(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
        
        // Check current month.
		await this.checkMonth(page);
        
        // Check next month.
        const navigators = await page.$$('.relcal');
        console.log(navigators[1].classList);
        await navigators[1].click();
        await delay(1000);
        await this.checkMonth(page);

        // await browser.close();
	},

    async checkMonth(page) {
        // Wait for the required DOM to be rendered
        await page.waitForFunction('document.querySelector(".content-spinner").style.display !== "none"');
        await delay(1000);
        const result = await page.$$('.cal_dia > .circlegreen:not(.ng-hide)');

        if (result.length) {
            const monthElement = await page.$('.col-xs-8 > .ng-binding');
            let value = await page.evaluate(el => el.textContent, monthElement);
            let message = `Turnos disponibles ${value}:`;
            const resultText = await Promise.all(result.map(async (option) => {
                const textObject = await option.getProperty('textContent');
                return textObject.jsonValue();
            }));

            resultText.forEach(text => message += '\n' + text);
        
            telegramBot.sendNotif(encodeURI(message));
        } else {
            console.log('No result');
        }
    }
}

module.exports = pageScraper
