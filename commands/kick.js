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
            //member.kick(reason);
        } else utils.messages.missingPermissions(message.channel);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "kick",
    aliases: null,
    description: "Kicks a user with a given reason",
    usage: "kick <name/ID/nickname> <reason>",
    restricted: "Security"
};