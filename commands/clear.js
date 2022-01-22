const utils = require("../utils.js");

module.exports.run = (client, message, args) => {
    utils.checkPermission(client, message, this.info.restricted).then(allowed => {
        if (!args[1] || isNaN(args[1])) return utils.messages.noArgs(message.channel, "amount");
        if (allowed) {
            message.channel.messages.fetch({ limit: parseInt(args[1]) + 1 }).then(messages => {
                message.channel.bulkDelete(messages);
            });
        } else utils.messages.missingPermissions(message.channel);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "clear",
    aliases: ["purge"],
    description: "Clears the given amount of messages in a channel",
    usage: "clear <amount>",
    restricted: "Security"
};