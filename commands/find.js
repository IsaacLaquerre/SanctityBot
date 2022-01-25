const Discord = require("discord.js");
const config = require("../botConfig.json");
const utils = require("../utils.js");

module.exports.run = (client, interaction, connection) => {
    utils.checkPermission(client, interaction, this.info.restricted).then(allowed => {
        if (!interaction.options.get("user")) return utils.messages.noArgs(interaction, "user");
        if (allowed) {
            client.guilds.fetch(config.guildId).then(guild => {
                guild.members.search({ query: interaction.options.get("user").value, limit: 1 }).then(member => {
                    member = member.first();
                    if (!member) return utils.messages.unknownUser(interaction);
                    connection.query("SELECT * FROM verification WHERE user=\"" + member.user.tag + "\";", function(err, result) {
                        var realmeyeLink = (member.nickname != null ? "https://www.realmeye.com/player/" + member.nickname : "Unknown");
                        if (result != undefined && result.verified) realmeyeLink = "https://www.realmeye.com/player/" + result[0].ign;

                        var embed = new Discord.MessageEmbed()
                            .setTitle(member.user.username)
                            .setDescription(member.toString())
                            .setThumbnail(member.user.avatarURL())
                            .addField("ID", member.user.id, true)
                            .addField("Realmeye Link", realmeyeLink, true)
                            .addField("Highest role", member.roles.highest.toString(), true)
                            .setFooter({ text: "Requested by: " + (interaction.member.nickname != null ? interaction.member.nickname : interaction.user.username) });
                        interaction.reply({ embeds: [embed] });
                    });
                });
            });
        } else return utils.messages.missingPermissions(interaction);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "find",
    aliases: ["f"],
    description: "Shows information regarding a user",
    options: [{
        name: "user",
        description: "The user you want info on",
        type: 3,
        required: true
    }],
    usage: "find <name/ID/nickname>",
    restricted: "Organizer"
};