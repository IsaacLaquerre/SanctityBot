const Discord = require("discord.js");
const config = require("../botConfig.json");
const utils = require("../utils.js");

module.exports.run = (client, interaction) => {
    utils.checkPermission(client, interaction, this.info.restricted).then(allowed => {
        if (allowed) {
            if (!interaction.options.get("dungeon")) return utils.messages.noArgs(interaction, "dungeon");
            client.channels.fetch(config.runsId).then(channel => {
                var reacts = [];

                var embed = new Discord.MessageEmbed()
                switch (interaction.options.get("dungeon").value.toLowerCase()) {
                    case "void":
                    case "v":
                        var runType = "Void";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s Void Headcount")
                            .setThumbnail("https://cdn.discordapp.com/emojis/899193984444940300.png")
                            .setDescription("React with " + utils.emotes.void + " if you are coming.\nReact with " + utils.emotes.lostHallsKey + " if you have a key.\nReact with " + utils.emotes.vial + " if you have a vial.\nOtherwise react with your gear/class choices below.")
                            .setColor("#250BC0");
                        reacts = [utils.emotes.void, utils.emotes.lostHallsKey, utils.emotes.vial, utils.emotes.armourBreak, utils.emotes.warrior, utils.emotes.paladin, utils.emotes.knight, utils.emotes.wizard, utils.emotes.marbleSeal, utils.emotes.fungalTome, utils.emotes.trickster];
                        break;
                    case "cult":
                    case "c":
                        runType = "Cult";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s Cult Headcount")
                            .setThumbnail("https://cdn.discordapp.com/attachments/896279366680584215/899192698899161098/813742136075092018.png")
                            .setDescription("React with " + utils.emotes.cult + " if you are coming.\nReact with " + utils.emotes.lostHallsKey + " if you have a key.\nOtherwise react with your gear/class choices below.")
                            .setColor("#B21111");
                        reacts = [utils.emotes.cult, utils.emotes.lostHallsKey, utils.emotes.planewalker, utils.emotes.armourBreak, utils.emotes.warrior, utils.emotes.paladin, utils.emotes.knight, utils.emotes.wizard, utils.emotes.marbleSeal, utils.emotes.fungalTome, utils.emotes.trickster];
                        break;
                    case "fullskip":
                    case "fs":
                        runType = "Full-Skip Void";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s Full-Skip Void Headcount")
                            .setThumbnail("https://cdn.discordapp.com/emojis/899193984444940300.png")
                            .setDescription("React with " + utils.emotes.fullSkip + " if you are coming.\nReact with " + utils.emotes.lostHallsKey + " if you have a key.\nReact with " + utils.emotes.vial + " if you have a vial\nOtherwise react with your gear/class choices below.")
                            .setColor("#250BC0");
                        reacts = [utils.emotes.fullSkip, utils.emotes.lostHallsKey, utils.emotes.vial, utils.emotes.mystic, utils.emotes.brain, utils.emotes.armourBreak, utils.emotes.warrior, utils.emotes.paladin, utils.emotes.knight, utils.emotes.wizard, utils.emotes.marbleSeal, utils.emotes.fungalTome, utils.emotes.trickster];
                        break;
                    case "oryx3":
                    case "o3":
                        runType = "Oryx 3";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s Oryx 3 Headcount")
                            .setThumbnail("https://cdn.discordapp.com/emojis/924661866192580628.png")
                            .setDescription("React with " + utils.emotes.o3 + " if you are coming.\nReact with " + utils.emotes.inc + " if you have an inc.\nReact with " + utils.emotes.trickster + " if you are able to bring a rushing class.\nReact with " + utils.emotes.decaRing + " to help us buy runes!\nOtherwise react with your gear/class choices below.")
                            .setColor("#FFEE59");
                        reacts = [utils.emotes.o3, utils.emotes.inc, utils.emotes.decaRing, utils.emotes.helmetRune, utils.emotes.swordRune, utils.emotes.shieldRune, utils.emotes.warrior, utils.emotes.knight, utils.emotes.paladin, utils.emotes.priest, utils.emotes.bard, utils.emotes.marbleSeal, utils.emotes.slow, utils.emotes.mystic, utils.emotes.trickster];
                        break;
                    case "shatters":
                    case "s":
                        runType = "Shatters";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s Shatters Headcount")
                            .setThumbnail("https://cdn.discordapp.com/attachments/748200247716479159/890001562620035122/unknown.png")
                            .setDescription("React with " + utils.emotes.shatters + " if you are coming.\nReact with " + utils.emotes.shattersKey + " if you have a key.\nReact with " + utils.emotes.planewalker + " if you are able to rush.\nOtherwise react with your gear/class choices below.")
                            .setColor("#254525");
                        reacts = [utils.emotes.shatters, utils.emotes.shattersKey, utils.emotes.planewalker, utils.emotes.fungalTome, utils.emotes.warrior, utils.emotes.paladin, utils.emotes.knight, utils.emotes.ogmur, utils.emotes.marbleSeal, utils.emotes.rangedDps, utils.emotes.slow, utils.emotes.curse, utils.emotes.expose];
                        break;
                    case "nest":
                    case "n":
                        runType = "Nest";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s Nest Headcount")
                            .setThumbnail("https://i.imgur.com/hUWc3IV.png")
                            .setDescription("React with " + utils.emotes.nest + " if you are coming.\nReact with " + utils.emotes.nestKey + " if you have a key.\nOtherwise react with your gear/class choices below.")
                            .setColor("#F27500");
                        reacts = [utils.emotes.nest, utils.emotes.nestKey, utils.emotes.qot, utils.emotes.knight, utils.emotes.warrior, utils.emotes.paladin, utils.emotes.trickster, utils.emotes.slow, utils.emotes.curse, utils.emotes.expose, utils.emotes.daze];
                        break;
                    case "fungal":
                    case "crystal":
                    case "f":
                        runType = "Fungal Cavern";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s Fungal Headcount")
                            .setThumbnail("https://i.imgur.com/K6rOQzR.png")
                            .setDescription("React with " + utils.emotes.fungal + " if you are coming.\nReact with " + utils.emotes.fungalKey + " if you have a key.\nReact with " + utils.emotes.planewalker + " if you are able to bring a rushing class.\nOtherwise react with your gear/class choices below.")
                            .setColor("#52326A");
                        reacts = [utils.emotes.fungal, utils.emotes.fungalKey, utils.emotes.warrior, utils.emotes.knight, utils.emotes.paladin, utils.emotes.priest, utils.emotes.trickster, utils.emotes.bard, utils.emotes.expose, utils.emotes.marbleSeal, utils.emotes.qot, utils.emotes.armourBreak, utils.emotes.slow, utils.emotes.mystic, utils.emotes.fungalTome, utils.emotes.planewalker];
                        break;
                    default:
                        embed.setTitle("Headcount failed")
                            .setDescription("Invalid argument. Please use `" + config.prefix + "hc <void/cult/fullskip/o3/shatters/nest/fungal>`")
                            .setColor("#FF0000");
                        break;
                }
                embed.setFooter({ text: (interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) });
                embed.setTimestamp(Date.now());
                if (reacts.length != 0) {
                    channel.send({ content: "@here", embeds: [embed] }).then(headcount => {
                        for (i in reacts) {
                            headcount.react(reacts[i]);
                        }
                        embed = new Discord.MessageEmbed()
                            .setDescription("Started headcount for " + runType)
                            .setColor("#00FF00");
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    });
                } else interaction.reply({ embeds: [embed], ephemeral: true });
            });
        } else return utils.messages.missingPermissions(interaction);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "headcount",
    aliases: ["hc"],
    description: "Start a headcount for a run",
    options: [{
        name: "dungeon",
        description: "The dungeon you want a headcount of",
        type: 3,
        required: true
    }],
    usage: "headcount <dungeon>",
    restricted: "Organizer"
};