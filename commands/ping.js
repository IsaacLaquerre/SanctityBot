const Discord = require("discord.js");

module.exports.run = (client, interaction) => {
    interaction.reply({ content: "**Pinging...**", fetchReply: true }).then(m => {
        let ping = m.createdTimestamp - interaction.createdTimestamp;
        embed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription("💓`" + ping + "`ms\n⏱`" + Math.round(client.ws.ping) + "`ms.");
        interaction.editReply({ embeds: [embed] });
    });
};

module.exports.info = {
    name: "ping",
    aliases: null,
    description: "Check the bot's ping",
    usage: "ping",
    restricted: false
};