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

    log(client, message, embed = false) {
        client.guilds.fetch(config.guildId).then(guild => {
            guild.channels.fetch(config.logId).then(log => {
                if (!embed) log.send(message);
                else log.send({ embeds: [message] });
            });
        });
    }
}

module.exports.messages = {
    missingPermissions(channel) {
        var embed = new Discord.MessageEmbed()
            .setDescription("You do not have the required permissions to use that command.");
        channel.send({ embeds: [embed] });
    },

    unknownUser(channel) {
        var embed = new Discord.MessageEmbed()
            .setDescription("Couldn't find that user.");
        channel.send({ embeds: [embed] });
    },

    noArgs(channel, arg) {
        var embed = new Discord.MessageEmbed()
            .setDescription("Command is missing a parameter: `" + arg + "`.");
        channel.send({ embeds: [embed] });
    },

    badArgument(channel, arg, value) {
        var embed = new Discord.MessageEmbed()
            .setDescription("Incorrect argument. Cannot use \"" + value + "\" for parameter `" + arg + "`.");
        channel.send({ embeds: [embed] });
    }
};

module.exports.emotes = {
    o3: "<:oryxs:924661866192580628>",
    inc: "<:incs:924661470766194709>",
    helmetRune: "<:helms:924660982582759445>",
    swordRune: "<:swords:924661018813157417>",
    shieldRune: "<:shields:924661443918438410>",
    decaRing: "<:decas:926213789819478057>",
    void: "<:voids:899193984444940300>",
    lostHallsKey: "<:keys:899194041298735154>",
    vial: "<:vials:899194056905719808>",
    fullSkip: "<:fullskips:899241087837814846>",
    cult: "<:cults:899194002992168980>",
    shatters: "<:shattersportals:926214235103563868>",
    shattersKey: "<:shatterskeys:926214029448450078>",
    nest: "<:nestportals:926220617219465256>",
    nestKey: "<:nestkeys:926220701793386506>",
    fungal: "<:fungalportals:926224937398714408>",
    fungalKey: "<:fungalkeys:926224956675731527>",
    armourBreak: "<:armour_breaks:899194132357062697>",
    slow: "<:slows:924664614334128139>",
    curse: "<:curses:926213837248684073>",
    expose: "<:exposes:926213854625660988>",
    daze: "<:dazes:926220659124756521>",
    rangedDps: "<:rangeddpss:926214650251579482>",
    warrior: "<:warriors:899194146986795008>",
    paladin: "<:paladins:899194159330656267>",
    knight: "<:knights:899194171955482705>",
    wizard: "<:wizards:899239204796649482>",
    mystic: "<:mystics:899194190678867990>",
    priest: "<:priests:924661517822091284>",
    trickster: "<:tricksters:899194213340704799>",
    bard: "<:bards:924661492568182806>",
    marbleSeal: "<:mseals:899239186765348894>",
    ogmur: "<:ogmurs:926213812980449293>",
    qot: "<:qots:926221843269029898>",
    fungalTome: "<:fungaltomes:899239154083332156>",
    planewalker: "<:planewalkers:899194100761362512>",
};

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});