const TelegramApi = require('node-telegram-bot-api')

const token='7323209408:AAGutyX6vqeSgGVzxKgaMEEKj4z95AYWUm4'

const bot = new TelegramApi(token, { polling: true});

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: "One", callback_data: "1"}, {text: "two", callback_data: "2"}, {text: "tree", callback_data: "3"}],
            [{text: "four", callback_data: "4"}, {text: "five", callback_data: "5"}, {text: "six", callback_data: "6"}],
            [{text: "seven", callback_data: "7"}, {text: "eight", callback_data: "8"}, {text: "nine", callback_data: "9"}],
            [{text: "nul", callback_data: "0"}],
        ]
    })
}

const start = () => {
    bot.setMyCommands([
        {command: "/start", description: "Say hello"},
        {command: "/info", description: "info about user"},
        {command: "/game", description: "play in game"},
    ]);
    
    bot.on('message', async(msg) => {
        console.log(msg);
    
    const text = msg.text;
    const chatId = msg.chat.id;
    
    if (text === "/start") {
        await bot.sendSticker(chatId, "https://data.chpic.su/stickers/b/BanditBublikKeksKorzhik2/BanditBublikKeksKorzhik2_001.webp");
        return bot.sendMessage(chatId, "Welcome my friend");
    }
    if (text === "/info") {
        return bot.sendMessage(chatId, `Your name: ${msg.from.first_name} ${msg.from.last_name}`);
    }
    if (text === "/game") {
        await bot.sendMessage(chatId, "Try to choise a right number from 0 to 10");
        const randomNumber = Math.floor(Math.random() * 10);
        chats[chatId] = randomNumber;
        return bot.sendMessage(chatId, "try", gameOptions);
    }
    return bot.sendMessage(chatId, "I dont understand you" )
    });
};

bot.on("callback_query", msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === chats[chatId]) {
        return bot.sendMessage(chatId, `Congrats, you win ${chats[chatId]}`)
    } else {
        return bot.sendMessage (chatId, `You lose ${chats[chatId]}`)
    }
});


start();