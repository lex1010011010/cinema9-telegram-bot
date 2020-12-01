const TelegramBot = require('node-telegram-bot-api')
const TOKEN = require('./TOKEN')
const debug = require('./helpers')
const films = require('./films.json')

const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})

console.log('Bot has been started!')

// bot.on('message', msg => {
//     const { id } = msg.chat
//     bot.sendMessage(id, debug(msg))
//         .then(() => {
//             console.log('Message has been sented')
//         })
//         .catch((error) => {
//             console.error(error)
//         })
// })




bot.onText(/\/start/, msg => {
    const { id } = msg.chat
    const startMessage = `Приет ${msg.from.first_name}, я бот кинотеатра Синем9 и я помогу тебе определится какой фильм ты хочешь посмотреть, для этого я задам тебе всего несколько вопросов`

    bot.sendMessage(id, startMessage)
        .then(() => {
            bot.sendMessage(id, 'Расскажи мне какое у тебя настроение', {
                reply_markup: {
                    keyboard: [
                        ['хочу смеяться', 'хочу грустить'],
                        ['хочу подумать', 'хочу напиться'],
                        ['бонус']
                    ]
                }
            })
        })
})

bot.onText(/хочу смеяться/, msg => {
    const { id } = msg.chat
    bot.sendMessage(id, 'Хочешь много смеяться? Тогда тебе нужно посмотреть комедию. Сейчас в прокате:')
        .then(() => {
            films.comedy.forEach(elems => {
                bot.sendMessage(id, `
${elems.name}
${elems.description}
${elems.link}`)
            })
        })
        .then(
            setTimeout(() => {
                bot.sendMessage(id, 'Что выберешь')
            }, 3000)
        )
})

bot.onText(/хочу грустить/, msg => {
    const { id } = msg.chat
    films.drama.forEach(elems => {
        bot.sendMessage(id, `
${elems.name}
${elems.description}
${elems.link}`)
    })
})

bot.onText(/бонус/, msg => {
    const { id } = msg.chat
    bot.sendMessage(id, 'Хотел бонус, сам виноват!!!')
        .then(() => {
            setTimeout(() => {
                bot.sendMessage(id, '3')
            }, 1000);
            setTimeout(() => {
                bot.sendMessage(id, '2')
            }, 3000);
            setTimeout(() => {
                bot.sendMessage(id, '1')
            }, 4000);
            setTimeout(() => {
                bot.sendSticker(id, "CAACAgIAAxkBAAOsX8ZYOmA46sMgbCsOjOTTQ0xXWloAAgMAA8KcDQAB9QLVWb5HKvseBA")
            }, 5000);
        })
})


