const Discord = require("discord.js");
const clear = require("clear-console")
const fs = require("fs");
const config = require("./botConfig.json");
const { kMaxLength } = require("buffer");

var client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS] });
var PREFIX = config.prefix;
var TOKEN = config.token;


client.on("ready", () => {
    clear({ toStart: true });
    client.user.setActivity(PREFIX + "help", { type: "PLAYING" });
    console.log("Bot ready");
});

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

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    var command = require(`./commands/${file}`);
    client.commands.set(command.help.name, command);
    console.log("Loaded " + command.help.name + " command");
}


client.on("messageCreate", (message) => {
    if (message.channel.type == "dm" || message.author.bot || message.author.id === "934119077885145118") return;
    if (message.mentions.has(client.users.fetch("934119077885145118"))) return message.channel.send("My prefix is `" + PREFIX + "`");
    if (!message.content.startsWith(PREFIX)) return;
    var args = message.content.slice(PREFIX.length).split(" ");

    var commandFile = client.commands.get(args[0]);
    if (commandFile) commandFile.run(client, message, args);
    else {
        for ([k, v] of client.commands.entries()) {
            if (v.help.aliases != null && v.help.aliases.includes(args[0])) commandFile.run(client, message, args);
            else return;
        }
    }

});

client.login(TOKEN);