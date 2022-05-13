const Discord = require("discord.js");
const utils = require("../utils.js");

module.exports.run = (client, interaction, connection) => {
    utils.checkPermission(client, interaction, this.info.restricted).then(allowed => {
        if (!interaction.options.get("location")) return utils.messages.noArgs(interaction, "location");
        if (allowed) {
            if (interaction.options.get("id")) {
                connection.query("SELECT * FROM runs WHERE id='" + interaction.options.get("id").value + "' AND ended=0", (err, runs) => {
                    if (runs[0] === undefined) return utils.messages.unknownRun(interaction);
                    if (runs[0].location === interaction.options.get("location").value) {
                        var embed = new Discord.MessageEmbed()
                            .setColor("#FF0000")
                            .setDescription("The location of this run is already set to \"" + interaction.options.get("location").value + "\"");
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    }

                    connection.query("UPDATE runs SET location='" + interaction.options.get("location").value + "' WHERE id='" + interaction.options.get("id").value + "';", (err) => {
                        if (err) return utils.messages.error(interaction, "Couldn't update the location of this run.\n\nError:\n" + err);
                        var keys = [];
                        if (runs[0].dungKeys != null) {
                            for (i in runs[0].dungKeys.split(";")) {
                                keys.push(JSON.parse(runs[0].dungKeys.split(";")[i]));
                            }
                        }

                        for (i in keys) {
                            client.users.fetch(keys[i].userId).then(user => {
                                user.createDM().then(dm => {
                                    var embed = new Discord.MessageEmbed()
                                        .setDescription("The location for " + runs[0].raidLeader + "'s " + runs[0].type + " has been updated to `" + interaction.options.get("location").value + "`");
                                    dm.send({ embeds: [embed] });
                                });
                            });
                        }

                        var vials = [];
                        if (runs[0].vials != null) {
                            for (i in runs[0].vials.split(";")) {
                                vials.push(JSON.parse(runs[0].vials.split(";")[i]));
                            }
                        }

                        for (i in vials) {
                            client.users.fetch(vials[i].userId).then(user => {
                                user.createDM().then(dm => {
                                    var embed = new Discord.MessageEmbed()
                                        .setDescription("The location for " + runs[0].raidLeader + "'s " + runs[0].type + " has been updated to `" + interaction.options.get("location").value + "`");
                                    dm.send({ embeds: [embed] });
                                });
                            });
                        }

                        var runes = [];
                        if (runs[0].runes != null) {
                            for (i in runs[0].runes.split(";")) {
                                vials.push(JSON.parse(runs[0].runes.split(";")[i]));
                            }
                        }

                        for (i in runes) {
                            client.users.fetch(runes[i].userId).then(user => {
                                user.createDM().then(dm => {
                                    var embed = new Discord.MessageEmbed()
                                        .setDescription("The location for " + runs[0].raidLeader + "'s " + runs[0].type + " has been updated to `" + interaction.options.get("location").value + "`");
                                    dm.send({ embeds: [embed] });
                                });
                            });
                        }

                        var embed = new Discord.MessageEmbed()
                            .setColor("#00FF00")
                            .setDescription("The location for " + runs[0].raidLeader + "'s " + runs[0].type + " has been updated to `" + interaction.options.get("location").value + "`");
                        return interaction.reply({ embeds: [embed] });

                    });
                });
            } else {
                connection.query("SELECT * FROM users WHERE userId='" + interaction.user.id + "';", (err, users) => {
                    connection.query("SELECT * FROM runs WHERE raidLeader='" + users[0].ign + "' AND ended=0", (err, runs) => {
                        if (runs[0] === undefined) return utils.messages.unknownRunRl(interaction);
                        if (runs[0].location === interaction.options.get("location").value) {
                            return utils.messages.error(interaction, "This run's location is already set to \"" + interaction.options.get("location").value + "\"");
                        }

                        connection.query("UPDATE runs SET location='" + interaction.options.get("location").value + "' WHERE id='" + runs[0].id + "';", (err) => {
                            if (err) return utils.messages.error(interaction, "Couldn't update the location of this run.\n\nError:\n" + err);
                            var keys = [];
                            if (runs[0].dungKeys != null) {
                                for (i in runs[0].dungKeys.split(";")) {
                                    keys.push(JSON.parse(runs[0].dungKeys.split(";")[i]));
                                }
                            }

                            for (i in keys) {
                                client.users.fetch(keys[i].userId).then(user => {
                                    user.createDM().then(dm => {
                                        var embed = new Discord.MessageEmbed()
                                            .setDescription("The location for " + runs[0].raidLeader + "'s " + runs[0].type + " has been updated to `" + interaction.options.get("location").value + "`");
                                        dm.send({ embeds: [embed] });
                                    });
                                });
                            }

                            var vials = [];
                            if (runs[0].vials != null) {
                                for (i in runs[0].vials.split(";")) {
                                    vials.push(JSON.parse(runs[0].vials.split(";")[i]));
                                }
                            }

                            for (i in vials) {
                                client.users.fetch(vials[i].userId).then(user => {
                                    user.createDM().then(dm => {
                                        var embed = new Discord.MessageEmbed()
                                            .setDescription("The location for " + runs[0].raidLeader + "'s " + runs[0].type + " has been updated to `" + interaction.options.get("location").value + "`");
                                        dm.send({ embeds: [embed] });
                                    });
                                });
                            }

                            var runes = [];
                            if (runs[0].runes != null) {
                                for (i in runs[0].runes.split(";")) {
                                    vials.push(JSON.parse(runs[0].runes.split(";")[i]));
                                }
                            }

                            for (i in runes) {
                                client.users.fetch(runes[i].userId).then(user => {
                                    user.createDM().then(dm => {
                                        var embed = new Discord.MessageEmbed()
                                            .setDescription("The location for " + runs[0].raidLeader + "'s " + runs[0].type + " has been updated to `" + interaction.options.get("location").value + "`");
                                        dm.send({ embeds: [embed] });
                                    });
                                });
                            }

                            var embed = new Discord.MessageEmbed()
                                .setColor("#00FF00")
                                .setDescription("The location for " + runs[0].raidLeader + "'s " + runs[0].type + " has been updated to `" + interaction.options.get("location").value + "`");
                            return interaction.reply({ embeds: [embed] });

                        });
                    });
                });
            }
        } else return utils.messages.missingPermissions(interaction);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "updateloc",
    aliases: ["updatelocation", "changeloc", "changelocation"],
    description: "Change the location of a run",
    options: [{
        name: "location",
        description: "The new location",
        type: 3,
        required: true
    }, {
        name: "id",
        description: "The ID of the run",
        type: 3
    }],
    usage: "updateloc <new location> [ID of the run]",
    restricted: "Organizer"
};