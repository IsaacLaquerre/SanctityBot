const Discord = require("discord.js");
const clear = require("clear-console");
const fs = require("fs");
const mysql = require('mysql');
const { REST, RequestManager } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fetch = require("fetch").fetchUrl;
const cheerio = require("cheerio");
const config = require("./botConfig.json");
const dbConfig = require("./dbConfig.json");
const reqs = require("./verificationReqs.json");


var client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], partials: ["CHANNEL"] });
var connection = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.pass,
    database: dbConfig.database,
    flags: "-FOUND_ROWS"
});
var PREFIX = config.prefix;
var TOKEN = config.token;


client.on("error", (err) => {
    return console.log(err);
});

process.on("uncaughtException", (err) => {
    return console.log(err);
});

process.on("unhandledRejection", (err) => {
    return console.log(err);
});


client.commands = new Discord.Collection();

var applicationCommands = [];

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    var command = require(`./commands/${file}`);
    client.commands.set(command.info.name, command);
    var applicationCommand = {
        name: command.info.name,
        description: command.info.description
    };
    if (command.info.options) applicationCommand.options = command.info.options;
    applicationCommands.push(applicationCommand);

    if (command.info.aliases != null) {
        for (i in command.info.aliases) {
            applicationCommand = {
                name: command.info.aliases[i],
                description: command.info.description
            };
            if (command.info.options) applicationCommand.options = command.info.options;
            applicationCommands.push(applicationCommand);
        }
        console.log("Loaded " + command.info.name + " command");
    }
}

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async() => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(config.botId, config.guildId), { body: applicationCommands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on("ready", () => {
    clear({ toStart: true });
    client.user.setActivity(PREFIX + "help", { type: "PLAYING" });
    console.log("Bot ready");
});

client.on("messageCreate", (message) => {
    if (message.author.bot || message.author.id === config.botId) return;
    if (message.channel.type === "DM") {
        client.guilds.fetch(config.guildId).then(guild => {
            guild.members.fetch(message.author.id).then(member => {
                if (member.roles.cache.has(config.verifiedRoleId)) return;
                connection.query("SELECT * FROM users WHERE userId=\"" + message.author.id + "\"", function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result[0] != undefined) {
                            if (result[0].verified) return;
                            if (new Date() > new Date(result[0].codeExpires)) return;
                            var embed = new Discord.MessageEmbed()
                                .setDescription("Working...")
                                .setColor("#FFFFFF");
                            message.author.send({ embeds: [embed] }).then(() => {
                                fetch("https://www.realmeye.com/player/" + message.content, (err, meta, body) => {
                                    if (err) {
                                        embed = new Discord.MessageEmbed()
                                            .setDescription("Couldn't find realmeye account named \"" + message.content + "\"")
                                            .setColor("#FF0000");
                                        return message.author.send({ embeds: [embed] });
                                    }

                                    const $ = cheerio.load(body.toString());

                                    if ($(".player-not-found").length > 0) {
                                        embed = new Discord.MessageEmbed()
                                            .setDescription("Couldn't find realmeye account named \"" + message.content + "\"")
                                            .setColor("#FF0000");
                                        return message.author.send({ embeds: [embed] });
                                    }

                                    var hasCode = false;
                                    $("div.description-line").each((i, el) => {
                                        if (el.children[0] != undefined) {
                                            if (el.children[0].data.includes(result[0].code)) hasCode = true;
                                        }
                                    });

                                    var hasStars = false;
                                    if (parseInt($("div.star-container").text()) >= reqs.stars) hasStars = true;

                                    var privateLoc = false;
                                    if (($("td")[21] != undefined ? $("td")[21].children[0].data : $("td")[17]) === "hidden") privateLoc = true;
                                    if (!reqs.privateLocation) privateLoc = true;

                                    embed = new Discord.MessageEmbed();

                                    if (hasCode && hasStars && privateLoc) {
                                        connection.query("UPDATE users SET ign=\"" + message.content + "\", verified=true WHERE userId=\"" + message.author.id + "\";", function(err) {
                                            if (err) {
                                                console.log(err);
                                                embed.setTitle("Something went wrong...")
                                                    .setColor("#FF0000")
                                                    .setDescription("Verification error:\n\nInternal error, please try again in a few minutes");
                                                message.author.send({ embeds: [embed] });
                                            } else {
                                                embed.setTitle("Success!")
                                                    .setColor("#00FF00")
                                                    .setDescription("Successfully verified under IGN `[" + message.content + "]`");
                                                message.author.send({ embeds: [embed] });
                                            }
                                        });
                                    } else {
                                        embed.setTitle("Something went wrong...")
                                            .setColor("#FF0000")
                                            .setDescription("Verification error:\n\n" + (hasCode ? "" : "Couldn't find the code in your realmeye description.\n") + (hasStars ? "" : "You do not meet the required amount of stars.\n") + (privateLoc ? "" : "You need to set your last seen location to private."));
                                        message.author.send({ embeds: [embed] });
                                    }
                                });
                            });
                        }
                    }
                });
            });
        });
    } else {
        if (message.mentions.has(config.botId)) return message.channel.send("My prefix is `" + PREFIX + "`");
    }
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    var commandFile = client.commands.get(interaction.commandName.toLowerCase());
    if (commandFile) {
        if (interaction.commandName.toLowerCase() === "verify" || interaction.commandName.toLowerCase() === "find" || interaction.commandName.toLowerCase() === "f") commandFile.run(client, interaction, connection);
        else commandFile.run(client, interaction);
    } else {
        for ([k, v] of client.commands.entries()) {
            if (v.info.aliases != null && v.info.aliases.includes(interaction.commandName.toLowerCase())) v.run(client, interaction);
        }
    }
});

client.login(TOKEN);