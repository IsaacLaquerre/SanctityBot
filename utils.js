const Discord = require("discord.js");
const config = require("./botConfig.json");

module.exports = {
    checkPermission(client, message, roleName) {
        return new Promise((resolve, reject) => {
            client.guilds.fetch(config.guildId).then(guild => {
                var role = guild.roles.cache.find(role => role.name === roleName);
                if (role === undefined) reject(new Error("Couldn't find a role with the name \"" + roleName + "\""));
                if (message.member.roles.highest.comparePositionTo(role) < 0) resolve(false);
                else resolve(true);
            });
        });
    },

    missingPermissions(channel) {
        var embed = new Discord.MessageEmbed()
            .setDescription("You do not have the required permissions to use that command.");
        channel.send({ embeds: [embed] });
    }
};

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});