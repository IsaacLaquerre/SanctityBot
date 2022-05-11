const Discord = require("discord.js");
const read = require("text-from-image");
const config = require("../botConfig.json");
const utils = require("../utils.js");

module.exports.run = (client, interaction, connection) => {
    utils.checkPermission(client, interaction, this.info.restricted).then(allowed => {
        if (allowed) {
            connection.query("SELECT ign FROM users WHERE userId='" + interaction.user.id + "';", function(err, rl) {
                if (!interaction.options.get("id")) var query = "raidLeader='" + rl[0].ign + "'";
                else query = "id='" + interaction.options.get("id").value + "'";
                connection.query("SELECT * FROM runs WHERE " + query + " AND started=1 AND ended=0;", function(err, runs) {
                    if (err || runs[0] === undefined) return (!interaction.options.get("id") ? utils.messages.unknownRunRl(interaction) : utils.messages.unknownRun(interaction));
                    var embed = new Discord.MessageEmbed()
                        .setColor("#FF9000")
                        .setDescription("Working...");
                    interaction.channel.messages.fetch({ limit: 10 }).then(async messages => {
                        interaction.reply({ embeds: [embed] });
                        var message = messages.filter(message => message.author.id === interaction.user.id && message.attachments.size > 0);
                        await read(message.first().attachments.first().url).then(text => {
                            var playerList = text.split(": ")[1].replace(/,\n/g, ", ").replace(/\n/g, ", ").split(", ").filter(player => player != "");

                            var raiders = [];
                            for (i in runs[0].playerList.split(";")) {
                                raiders.push(JSON.parse(runs[0].playerList.split(";")[i]));
                            }

                            var igns = [];
                            for (i in raiders) {
                                igns.push(raiders[i].ign.toLowerCase());
                            }

                            var members = [];
                            for (i in raiders) {
                                members.push(interaction.guild.members.cache.get(raiders[i].userId));
                            }

                            var inVc = [];
                            for (i in members) {
                                if (members[i].voice && members[i].voice.channel.id === runs[0].voiceChannel) inVc.push(members[i]);
                            }

                            var crashers = playerList.filter(player => !igns.includes(player.toLowerCase()));
                            var otherChannels = playerList.filter(player => player != 0);

                            var parseEmbed = new Discord.MessageEmbed()
                                .setTitle("Parse for " + rl[0].ign + "'s " + runs[0].type)
                                .setColor("#0000FF")
                                .setDescription("There are " + crashers.length + (crashers.length != 1 ? " crashers" : " crasher") + " and " + crashers.length + " people in other channels.")
                                .addField("Other Channels", (otherChannels.length != 0 ? otherChannels.join(", ") : "None"))
                                .addField("Crashers", (crashers.length != 0 ? crashers.join(", ") : "None"))
                                .addField("Find Command", config.prefix + "find")
                                .addField("Kick List", (crashers.length != 0 ? "```/kick " + crashers.join(", ") + "```" : "None"))
                                .setFooter({ text: runs[0].id });
                            interaction.editReply({ embeds: [parseEmbed] });
                        });
                    }).catch(err => {
                        embed.setColor("#FF0000")
                            .setDescription("Couldn't find a player list in the last 10 messages");
                        interaction.editReply({ embeds: [embed] });
                    });
                });
            });
        } else return utils.messages.missingPermissions(interaction);
    });
};

module.exports.info = {
    name: "parse",
    aliases: ["p"],
    description: "Parse the users in a run",
    options: [{
        name: "id",
        description: "The ID of the run you want to parse",
        type: 3
    }],
    usage: "parse <send a screenshot of the player list **before** using this command> (Please try to get a picture against an all-black or dark background. A good tip is to zoom out your camera all the way)",
    restricted: "Organizer"
};