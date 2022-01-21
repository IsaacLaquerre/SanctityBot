const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    message.channel.send("**Pinging...**").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp;
        embed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription("💓`" + ping + "`ms\n⏱`" + Math.round(client.ws.ping) + "`ms.");
        m.edit({ embeds: [embed] });
    });
};

module.exports.help = {
    name: "ping",
    aliases: null,
    description: "Check the bot's ping",
    usage: "ping"
};