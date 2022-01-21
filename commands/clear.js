const utils = require("../utils.js");

module.exports.run = (client, message, args) => {
    if (!args[1] || isNaN(args[1])) return;
    utils.checkPermission(client, message, this.info.restricted).then(allowed => {
        if (allowed) {
            message.channel.messages.fetch({ limit: parseInt(args[1]) + 1 }).then(messages => {
                message.channel.bulkDelete(messages);
            });
        } else utils.missingPermissions(message.channel);
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