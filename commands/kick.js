const Discord = require("discord.js");
const utils = require("../utils.js");

module.exports.run = (client, interaction) => {
    utils.checkPermission(client, interaction, this.info.restricted).then(allowed => {
        if (allowed) {
            if (!interaction.options.get("user")) return utils.messages.noArgs(interaction, "user");
            var member = interaction.guild.members.cache.find(member => member.user.username === interaction.options.get("user").value);
            if (!member) member = interaction.guild.members.cache.find(member => member.user.id === interaction.options.get("user").value);
            if (!member) member = interaction.guild.members.cache.find(member => member.user.nickname === interaction.options.get("user").value);
            if (!member) return utils.messages.unknownUser(interaction, interaction.options.get("user").value);
            if (!interaction.options.get("reason")) return utils.messages.noArgs(interaction, "reason");
            var reason = interaction.options.get("reason").value;
            var embed = new Discord.MessageEmbed()
                .setAuthor(member.user.tag, member.user.avatarURL())
                .setTitle("Kicked by " + (interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag))
                .setDescription("Reason: `" + reason + "`")
                .setColor("#FF0000")
                .setFooter({ text: "ID: " + member.user.id });
            utils.log(client, embed, true);
            embed = new Discord.MessageEmbed()
                .setDescription("Kicked " + member.user.tag.toString())
                .setColor("#39FF14");
            interaction.reply({ embeds: [embed] });
            member.kick(reason);
        } else utils.messages.missingPermissions(interaction);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "kick",
    aliases: null,
    description: "Kicks a user with a given reason",
    options: [{
        name: "user",
        description: "The user you want to kick",
        type: 3,
        required: true
    }, {
        name: "reason",
        description: "The reason for kicking the user",
        type: 3,
        required: true
    }],
    usage: "kick <name/ID/nickname> <reason>",
    restricted: "Security"
};