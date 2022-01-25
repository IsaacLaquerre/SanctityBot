const Discord = require("discord.js");
const reqs = require("../verificationReqs.json");

module.exports.run = (client, interaction, connection) => {
    connection.query("SELECT * FROM users WHERE userId=\"" + interaction.user.id + "\"", function(err, result) {
        if (result[0] === undefined) {
            var code = interaction.guild.name.substring(0, 3) + (Math.floor(Math.random() * (999 - 100 + 1)) + 100);
            var expires = new Date();
            expires.setMinutes(expires.getMinutes() + 15);
            var embed = new Discord.MessageEmbed()
                .setTitle("How to verify")
                .setAuthor({ name: (interaction.guild.name + " Verification"), iconURL: interaction.guild.iconURL() })
                .setDescription("```md\n1. Make sure your realmeye matches the server-specific requirements below.\n2. Put the code\n\n#     " + code + "     #\n\nin your realmeye description.\n3. Type your in-game name here as it appears in-game (case-sensitive).\n```")
                .addField("\u200b", "**__Server-Specific Verification Requirements:__**")
                .addField("**Stars Required**", "```lua\n" + reqs.stars + "\n```", true)
                .addField("**Hidden Location Required**", "```\n" + reqs.privateLocation + "\n```", true)
                .setColor("#FFFFFF");
            connection.query("INSERT INTO users (user, userId, code, codeExpires, verified) VALUES (\"" + interaction.user.tag + "\", \"" + interaction.user.id + "\", \"" + code + "\", \"" + expires.getFullYear() + "-" + ("0" + (expires.getMonth() + 1)).slice(-2) + "-" + ("0" + expires.getDate()).slice(-2) + " " + ("0" + expires.getHours()).slice(-2) + ":" + ("0" + expires.getMinutes()).slice(-2) + ":" + ("0" + expires.getSeconds()).slice(-2) + "\", false);", function(err) {
                interaction.user.send({ embeds: [embed] });
                embed = new Discord.MessageEmbed()
                    .setDescription("Verification started, please check your DMs to continue")
                    .setColor("#00FF00");
                interaction.reply({ embeds: [embed], ephemeral: true });
            });
        } else if (result[0] != undefined && !result[0].verified) {
            if (new Date() <= new Date(result[0].codeExpires)) {
                embed = new Discord.MessageEmbed()
                    .setDescription("You were already given a verification code! Check your DMs.")
                    .setColor("#FF0000");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
            var code = interaction.guild.name.substring(0, 3) + (Math.floor(Math.random() * (999 - 100 + 1)) + 100);
            var expires = new Date();
            expires.setMinutes(expires.getMinutes() + 15);
            embed = new Discord.MessageEmbed()
                .setTitle("How to verify")
                .setAuthor({ name: (interaction.guild.name + " Verification"), iconURL: interaction.guild.iconURL() })
                .setDescription("```md\n1. Make sure your realmeye matches the server-specific requirements below.\n2. Put the code\n\n#     " + code + "     #\n\nin your realmeye description.\n3. Type your in-game name here as it appears in-game (case-sensitive).\n```")
                .addField("\u200b", "**__Server-Specific Verification Requirements:__**")
                .addField("**Stars Required**", "```lua\n" + reqs.stars + "\n```", true)
                .addField("**Hidden Location Required**", "```\n" + reqs.privateLocation + "\n```", true)
                .setColor("#FFFFFF");
            connection.query("UPDATE users SET code=\"" + code + "\", codeExpires=\"" + expires.getFullYear() + "-" + ("0" + (expires.getMonth() + 1)).slice(-2) + "-" + ("0" + expires.getDate()).slice(-2) + " " + ("0" + expires.getHours()).slice(-2) + ":" + ("0" + expires.getMinutes()).slice(-2) + ":" + ("0" + expires.getSeconds()).slice(-2) + "\" WHERE userId=\"" + interaction.user.id + "\";", function(err) {
                interaction.user.send({ embeds: [embed] });
                embed = new Discord.MessageEmbed()
                    .setDescription("Verification started, please check your DMs to continue")
                    .setColor("#00FF00");
                interaction.reply({ embeds: [embed], ephemeral: true });
            });
        } else {
            embed = new Discord.MessageEmbed()
                .setDescription("You are already verified.")
                .setColor("#FF0000");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        };
    });
};

module.exports.info = {
    name: "verify",
    aliases: null,
    description: "Verify your account and link it to your IGN",
    usage: "verify",
    restricted: false
};