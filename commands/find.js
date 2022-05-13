const Discord = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");
const config = require("../botConfig.json");
const utils = require("../utils.js");

module.exports.run = (client, interaction, connection) => {
    utils.checkPermission(client, interaction, this.info.restricted).then(allowed => {
        if (!interaction.options.get("user")) return utils.messages.noArgs(interaction, "user");
        if (allowed) {
            client.guilds.fetch(config.guildId).then(guild => {
                guild.members.search({ query: interaction.options.get("user").value, limit: 1 }).then(member => {
                    member = member.first();
                    connection.query("SELECT * FROM verification WHERE user=\"" + (member != undefined ? member.user.tag : interaction.options.get("user").value) + "\";", async function(err, result) {
                        if (result === undefined) var realmeyeLink = "https://www.realmeye.com/player/" + interaction.options.get("user").value;
                        else realmeyeLink = (member.nickname != null ? "https://www.realmeye.com/player/" + member.nickname : "Unknown");
                        if (result != undefined && result.verified) realmeyeLink = "https://www.realmeye.com/player/" + result[0].ign;

                        var itemList = [];

                        await utils.requestItems().then(response => {
                            itemList = response;
                        });

                        request(realmeyeLink, {
                            method: "GET",
                            headers: {
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
                            }
                        }, (err, response, body) => {
                            if (!err && response.statusCode === 200) {

                                var $ = cheerio.load(body);

                                if ($.html().includes("player-not-found")) return utils.messages.unknownUser(interaction, interaction.options.get("user").value);

                                var username = $("span.entity-name").text();

                                var info = [];
                                $("div.container table.summary tbody tr").each((i, element) => {
                                    var field = [];
                                    element.children.forEach(child => {
                                        child.children.forEach(child => {
                                            if (child.children === undefined) {
                                                if (child.data) field.push(child.data);
                                            } else {
                                                child.children.forEach(child => {
                                                    if (child.data != undefined) field.push(child.data);
                                                    if (child.attribs && child.attribs.class) {
                                                        if (child.attribs.class.includes("star")) {
                                                            info.push(["Star", child.attribs.class.split(" ")[1].split("star-")[1]]);
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    });
                                    info.push(field);
                                });

                                var summary = {};
                                for (var i in info) {
                                    var field = info[i][0];
                                    var value = info[i].slice(1).join("");
                                    if (field.indexOf(" ") != -1) field = field.split(" ")[0].toLowerCase() + field.split(" ")[1].charAt(0).toUpperCase() + field.split(" ")[1].slice(1);
                                    else field = field.toLowerCase();
                                    if (field.replace(/ /g, "").toLowerCase() != "firstseen" && field.replace(/ /g, "").toLowerCase() != "lastseen" && value.indexOf(" ") != -1) {
                                        summary[field] = value.split(" ")[0];
                                        summary[field + "Rank"] = value.split(" ")[1].replace(/\(/g, "").replace(/\)/g, "");
                                    } else {
                                        summary[field] = value;
                                    }
                                }

                                var data = {
                                    username: username,
                                    summary: summary
                                };

                                var embed = new Discord.MessageEmbed()
                                    .setTitle((member != undefined ? member.user.tag : data.username))
                                    .setDescription((member != undefined ? member.toString() : ""))
                                    .setThumbnail((member != undefined ? member.user.avatarURL() : ""))
                                    .addField("ID", (member != undefined ? member.user.id : "Not verified"), true)
                                    .addField("Highest Role", (member != undefined ? member.roles.highest.toString() : "Not verified"), true)
                                    .addField("⠀", "⠀", true)
                                    .addField("Fame", utils.numberWithSpaces(data.summary.fame), true)
                                    .addField("Rank", data.summary.rank + " " + utils.emotes.stars[data.summary.star], true)
                                    .addField("Guild", data.summary.guild || "Not in a guild", true)
                                    .addField("Realmeye Link", "https://www.realmeye.com/player/" + data.username)
                                    .setFooter({ text: "Requested by: " + (interaction.member.nickname != null ? interaction.member.nickname : interaction.user.username), iconURL: interaction.user.avatarURL() });
                                interaction.reply({ embeds: [embed] });
                            }
                        });
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