const Discord = require("discord.js");
const utils = require("../utils.js");
const config = require("../botConfig.json");

module.exports.run = (client, message, args) => {
    utils.checkPermission(client, message, this.info.restricted).then(allowed => {
        if (!args[1]) return utils.messages.noArgs(message.channel, "user");
        if (allowed) {
            client.guilds.fetch(config.guildId).then(guild => {
                if (isNaN(args[1])) return utils.messages.badArgument(message.channel, "user", args[1]);
                client.users.fetch(args[1]).then(user => {
                    if (!args[2]) return utils.messages.noArgs(message.channel, "reason");
                    var reason = args.slice(2).join(" ");
                    var embed = new Discord.MessageEmbed()
                        .setAuthor(user.tag, user.avatarURL())
                        .setTitle("Unbanned by " + (message.member.nickname != null ? message.member.nickname : message.author.tag))
                        .setDescription("Reason: `" + reason + "`")
                        .setColor("#FF0000")
                        .setFooter("ID: " + user.id);
                    utils.log(client, embed, true);
                    embed = new Discord.MessageEmbed()
                        .setDescription("Unbanned " + user.tag.toString())
                        .setColor("#39FF14");
                    message.channel.send({ embeds: [embed] });
                    guild.bans.remove(args[1], reason);
                });
            });
        } else utils.messages.missingPermissions(message.channel);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "unban",
    aliases: null,
    description: "Unbans a user with a given reason",
    usage: "unban <ID> <reason>",
    restricted: "Moderator"
};