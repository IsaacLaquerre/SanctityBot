const utils = require("../utils.js");

module.exports.run = (client, interaction) => {
    utils.checkPermission(client, interaction, this.info.restricted).then(allowed => {
        if (!interaction.options.get("amount") || isNaN(interaction.options.get("amount").value)) return utils.messages.noArgs(interaction, "amount");
        if (interaction.options.get("amount").value <= 0) return utils.messages.badArgument(interaction, "amount", interaction.options.get("amount").value);
        if (allowed) {
            interaction.channel.messages.fetch({ limit: parseInt(interaction.options.get("amount").value) + 1 }).then(messages => {
                interaction.channel.bulkDelete(messages);
                interaction.reply({ content: "Deleted " + interaction.options.get("amount").value + (interaction.options.get("amount").value != 1 ? " messages" : " message"), ephemeral: true });
            });
        } else utils.messages.missingPermissions(interaction);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "clear",
    aliases: ["purge", "delete"],
    description: "Clears the given amount of messages in a channel",
    options: [{
        name: "amount",
        description: "The amount of messages you want to clear",
        type: 4,
        required: true
    }],
    usage: "clear <amount>",
    restricted: "Security"
};