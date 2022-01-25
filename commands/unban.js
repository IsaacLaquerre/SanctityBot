const Discord = require("discord.js");
const utils = require("../utils.js");
const config = require("../botConfig.json");

module.exports.run = (client, interaction) => {
    utils.checkPermission(client, interaction, this.info.restricted).then(allowed => {
        if (allowed) {
            if (!interaction.options.get("user")) return utils.messages.noArgs(interaction, "user");
            client.guilds.fetch(config.guildId).then(guild => {
                if (isNaN(interaction.options.get("user").value)) return utils.messages.badArgument(interaction, "user", interaction.options.get("user").value);
                client.users.fetch(interaction.options.get("user").value).then(user => {
                    if (!interaction.options.get("reason")) return utils.messages.noArgs(interaction, "reason");
                    var reason = interaction.options.get("reason").value;
                    var embed = new Discord.MessageEmbed()
                        .setAuthor({ name: user.tag, iconURL: user.avatarURL() })
                        .setTitle("Unbanned by " + (interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag))
                        .setDescription("Reason: `" + reason + "`")
                        .setColor("#FF0000")
                        .setFooter({ text: "ID: " + user.id });
                    utils.log(client, embed, true);
                    embed = new Discord.MessageEmbed()
                        .setDescription("Unbanned " + user.tag.toString())
                        .setColor("#39FF14");
                    interaction.reply({ embeds: [embed] });
                    guild.bans.remove(interaction.options.get("user").value, reason);
                }).catch(err => {
                    return utils.messages.unknownUser(interaction, interaction.options.get("user").value);
                });
            });
        } else utils.messages.missingPermissions(interaction);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "unban",
    aliases: null,
    description: "Unbans a user with a given reason",
    options: [{
        name: "user",
        description: "The user you want to unban",
        type: 3,
        required: true
    }, {
        name: "reason",
        description: "The reason for unbanning the user",
        type: 3,
        required: true
    }],
    usage: "unban <ID> <reason>",
    restricted: "Moderator"
};