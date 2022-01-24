const Discord = require("discord.js");
const config = require("../botConfig.json");
const utils = require("../utils.js");

module.exports.run = (client, message, args) => {
    utils.checkPermission(client, message, this.info.restricted).then(allowed => {
        if (!args[1]) return utils.messages.noArgs(message.channel, "user");
        if (allowed) {
            client.guilds.fetch(config.guildId).then(guild => {
                guild.members.search({ query: args[1], limit: 1 }).then(member => {
                    member = member.first();
                    if (!member) return utils.messages.unknownUser(message.channel);
                    var embed = new Discord.MessageEmbed()
                        .setTitle(member.user.username)
                        .setDescription(member.toString())
                        .setThumbnail(member.user.avatarURL())
                        .addField("ID", member.user.id, true)
                        .addField("Realmeye Link", (member.nickname != null ? "https://www.realmeye.com/player/" + member.nickname : "Unknown"), true)
                        .addField("Highest role", member.roles.highest.toString(), true)
                        .setFooter("Requested by: " + (message.member.nickname != null ? message.member.nickname : message.author.username));
                    message.channel.send({ embeds: [embed] });
                });
            });
        } else return utils.messages.missingPermissions(message.channel);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "find",
    aliases: ["f"],
    description: "Shows information regarder a user",
    usage: "find <name/ID/nickname>",
    restricted: "Organizer"
};