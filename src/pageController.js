const pageScraper = require('./scraper/pageScraper.js');
const scrapeAll = async (browserInstance) => {
	let browser;
	try{
		browser = await browserInstance;
		await pageScraper.scrape(browser);	
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = { scrapeAll }
