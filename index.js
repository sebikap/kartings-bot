const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

// Scrape
const browser = require('./src/scraper/browser');
const pageController = require('./src/pageController');

// Cron
const cron = require('node-cron');

// Bot
const telegramBot = require('./src/notify/notifier');

const port = process.env.PORT || 3000;
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/', router);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// listen
telegramBot.raven();

// node cron
// cron.schedule('* * * * * ', () => {
    // console.log('Running cron');
    //Start the browser and create a browser instance
    let browserInstance = browser.startBrowser();
    
    // Pass the browser instance to the scraper controller
    pageController.scrapeAll(browserInstance)
// });
