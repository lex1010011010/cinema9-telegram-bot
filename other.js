bot.onText(/\help (.+)/, (msg, [sourse, match]) => {
    const { id } = msg.chat

    bot.sendMessage(id, debug(match))
})
