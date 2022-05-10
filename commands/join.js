const Discord = require("discord.js");
const config = require("../botConfig.json");
const utils = require("../utils.js");

module.exports.run = (client, interaction, connection) => {
    connection.query("SELECT * FROM runs WHERE started=1 AND ended=0", function(err, runs) {
        var embed = new Discord.MessageEmbed();
        if (runs[0] === undefined) {
            connection.query("SELECT * FROM runs WHERE started=0 AND ended=0", function(err, runs2) {
                if (runs2[0] === undefined) {
                    embed.setDescription("Couldn't find an active run that you are part of.")
                        .setColor("#FF0000");
                }
                var keys = [];
                var runes = [];

                if (runs2[0].dungKeys != null) {
                    for (i in runs[0].dungKeys.split(";")) {
                        keys.push(JSON.parse(runs[0].dungKeys.split(";")[i]));
                    }
                }
            });
        } else if (!interaction.guild.members.cache.get(interaction.user.id).voice.channel) {
            embed.setDescription("Couldn't find you in a voice channel. Please join " + interaction.guild.channels.cache.get(config.lounge).toString() + " and try again.")
                .setColor("#FF0000");
        } else if (interaction.guild.members.cache.get(interaction.user.id).voice.channel.id === runs[0].voiceChannel) {
            embed.setDescription("You are already in this voice channel.")
                .setColor("#FF0000");
        } else {
            interaction.guild.members.cache.get(interaction.user.id).voice.setChannel(interaction.guild.channels.cache.get(runs[0].voiceChannel));
            embed.setDescription("Moved to " + interaction.guild.channels.cache.get(runs[0].voiceChannel).toString() + ".")
                .setColor("#00FF00");
        }
        return interaction.reply({ embeds: [embed], ephemeral: true });
    });
};

module.exports.info = {
    name: "join",
    aliases: ["j"],
    description: "Connects a user back in the voice channel of a run",
    usage: "join",
    restricted: false
};