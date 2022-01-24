const Discord = require("discord.js");
const utils = require("../utils.js");

module.exports.run = (client, message, args) => {
    utils.checkPermission(client, message, this.info.restricted).then(allowed => {
        if (!args[1]) return utils.messages.noArgs(message.channel, "user");
        if (allowed) {
            var member = message.guild.members.cache.find(member => member.user.username === args[1]);
            if (!member) member = message.guild.members.cache.find(member => member.user.id === args[1]);
            if (!member) member = message.guild.members.cache.find(member => member.user.nickname === args[1]);
            if (!member) return utils.messages.unknownUser(message.channel);
            if (!args[2]) return utils.messages.noArgs(message.channel, "reason");
            var reason = args.slice(2).join(" ");
            var embed = new Discord.MessageEmbed()
                .setAuthor(member.user.tag, member.user.avatarURL())
                .setTitle("Banned by " + (message.member.nickname != null ? message.member.nickname : message.author.tag))
                .setDescription("Reason: `" + reason + "`")
                .setColor("#FF0000")
                .setFooter("ID: " + member.user.id);
            utils.log(client, embed, true);
            embed = new Discord.MessageEmbed()
                .setDescription("Banned " + member.user.tag.toString())
                .setColor("#39FF14");
            message.channel.send({ embeds: [embed] });
            member.ban({ reason: reason });
        } else utils.messages.missingPermissions(message.channel);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "ban",
    aliases: null,
    description: "Bans a user with a given reason",
    usage: "ban <name/ID/nickname> <reason>",
    restricted: "Moderator"
};