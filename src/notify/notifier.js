const TelegramBot = require('node-telegram-bot-api');
const https = require('https');

// t.me/KartingsChupachapBot
const token = '5210896866:AAEYwoZghmEqqVbddtF5J0bkPYJVvh7lCXw';
const chatId = '561975819';
const fs = require('fs');
const path = require('path');

const bot = new TelegramBot(token, { polling: true });

const raven = () => {
    bot.onText('/check', (msg) => {
        const chatId = msg.chat.id;
        fs.readFileSync(path.join(__dirname, './db.json'), (err, data) => {
            if (err) { console.log(err); throw err; }
            let a = JSON.parse(data);
            let message = `Hay turno ${data}`;

            bot.sendMessage(chatId, message);
        })
    });
};

const sendNotif = (msg) => {
    const target = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&&text=${msg}`;
    https.get(target, (res) => {
        console.log('Notification sent');
    });
};

module.exports = { raven, sendNotif }