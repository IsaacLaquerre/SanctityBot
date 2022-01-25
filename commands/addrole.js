const Discord = require("discord.js");
const utils = require("../utils.js");
const config = require("../botConfig.json");

module.exports.run = (client, interaction) => {
    utils.checkPermission(client, interaction, this.info.restricted).then(allowed => {
        if (allowed) {
            if (!interaction.options.get("user")) return utils.messages.noArgs(interaction, "user");
            client.guilds.fetch(config.guildId).then(guild => {
                guild.members.fetch(interaction.options.get("user").user.id).then(member => {
                    if (!interaction.options.get("role")) return utils.messages.noArgs(interaction, "role");
                    if (member.roles.cache.has(interaction.options.get("role").role.id)) return utils.messages.alreadyHasRole(interaction, interaction.options.get("user").user.tag, interaction.options.get("role").role);
                    member.roles.add(interaction.options.get("role").role.id).then(() => {
                        var embed = new Discord.MessageEmbed()
                            .setDescription("Gave role \"" + interaction.options.get("role").role.toString() + "\" to user \"" + interaction.options.get("user").user.tag + "\"")
                            .setColor("#00FF00");
                        return interaction.reply({ embeds: [embed] });
                    }).catch(err => { return utils.messages.unknownRole(interaction, interaction.options.get("role").role.name); });
                }).catch(err => {
                    return utils.messages.unknownUser(interaciton, interaction.options.get("user").user.tag);
                });
            });
        } else utils.messages.missingPermissions(interaction);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "addrole",
    aliases: ["ar"],
    description: "Give a role to a user",
    options: [{
        name: "role",
        description: "The role you want to give the user",
        type: 8,
        required: true
    }, {
        name: "user",
        description: "The user you want to give the role to",
        type: 6,
        required: true
    }],
    usage: "addrole <role> <user>",
    restricted: "Moderator"
};