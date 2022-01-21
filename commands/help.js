const Discord = require("discord.js");
const config = require("../botConfig.json");

module.exports.run = (client, message, args) => {
    if (args[1]) {
        var command = client.commands.find(c => c.info.name === args[1].toLowerCase()) || client.commands.find(c => c.info.aliases.includes(args[1].toLowerCase()));
        if (command) {
            var embed = new Discord.MessageEmbed()
                .setTitle(command.info.name.capitalize())
                .setColor("#FFFFFF")
                .setDescription(command.info.description);
            command.info.aliases != null ? embed.addField("Aliases", command.info.aliases.join(", ")) : "";
            embed.addField("Usage", config.prefix + command.info.usage);
            message.channel.send({ embeds: [embed] });
        }
    } else {
        var unrestricedCommands = [];
        var organizerCommands = [];
        var securityCommands = [];
        var moderatorCommands = [];
        var ballerRole;
        var organizerRole;
        var securityRole;
        var moderatorRole;
        client.guilds.fetch(config.guildId).then(guild => {
            ballerRole = guild.roles.cache.find(role => role.name === "baller");
        });

        for ([k, v] of client.commands.entries()) {
            if (!v.info.restricted) {
                unrestricedCommands.push(config.prefix + v.info.name);
                break;
            }
            switch (v.info.restricted.toLowerCase()) {
                case "organizer":
                    organizerCommands.push(config.prefix + v.info.name);
                    break;
                case "security":
                    securityCommands.push(config.prefix + v.info.name);
                    break;
                case "moderator":
                    moderatorCommands.push(config.prefix + v.info.name);
                    break;
                default:
                    break;
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle("List of commands")
            .setColor("#FFFFFF")
            .setDescription("Use " + config.prefix + "help <command> for more info on a specific command")
            .addField("Required role", "baller")
            .addField("`" + unrestricedCommands.join("`, `") + "`", "\u200b")
            .addField("Required role", "Organizer")
            .addField("`" + organizerCommands.join("`, `") + "`", "\u200b")
            .addField("Required role", "Security")
            .addField("`" + securityCommands.join("`, `") + "`", "\u200b")
            .addField("Required role", "Moderator")
            .addField("`" + moderatorCommands.join("`, `") + "`", "\u200b");
        message.channel.send({ embeds: [embed] });
    }
};

module.exports.info = {
    name: "help",
    aliases: ["h"],
    description: "List of available commands",
    usage: "help [command]",
    restricted: false
};