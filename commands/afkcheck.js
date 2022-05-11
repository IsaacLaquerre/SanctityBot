const Discord = require("discord.js");
const { v4: uuid } = require('uuid');
const config = require("../botConfig.json");
const utils = require("../utils.js");

module.exports.run = async(client, interaction, connection) => {
    utils.checkPermission(client, interaction, this.info.restricted).then(allowed => {
        if (allowed) {
            if (!interaction.options.get("dungeon")) return utils.messages.noArgs(interaction, "dungeon");
            if (!interaction.options.get("location")) return utils.messages.noArgs(interaction, "location");
            var voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) return utils.messages.noVoiceChannel(interaction);
            client.channels.fetch(config.runsId).then(channel => {
                var reacts = [];
                var preReacts = [];
                var runType = "invalid";

                var embed = new Discord.MessageEmbed()
                switch (interaction.options.get("dungeon").value.toLowerCase()) {
                    case "void":
                        runType = "Void";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s AFK Check")
                            .setThumbnail("https://cdn.discordapp.com/emojis/899193984444940300.png")
                            .setDescription("React with " + utils.emotes.void + " if you are coming.\nReact with " + utils.emotes.lostHallsKey + " if you have a key.\nReact with " + utils.emotes.vial + " if you have a vial.\nOtherwise react with your gear/class choices below.")
                            .setColor("#250BC0");
                        reacts = [utils.emotes.void, utils.emotes.lostHallsKey, utils.emotes.vial, utils.emotes.armorBreak, utils.emotes.warrior, utils.emotes.paladin, utils.emotes.knight, utils.emotes.wizard, utils.emotes.marbleSeal, utils.emotes.fungalTome, utils.emotes.trickster, utils.emotes.nitro];
                        preReacts = [utils.emotes.lostHallsKey, utils.emotes.vial, utils.emotes.armorBreak, utils.emotes.nitro];
                        break;
                    case "cult":
                        runType = "Cult";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s AFK Check")
                            .setThumbnail("https://cdn.discordapp.com/attachments/896279366680584215/899192698899161098/813742136075092018.png")
                            .setDescription("React with " + utils.emotes.cult + " if you are coming.\nReact with " + utils.emotes.lostHallsKey + " if you have a key.\nReact with " + utils.emotes.planewalker + " if you are rushing.\nOtherwise react with your gear/class choices below.")
                            .setColor("#B21111");
                        reacts = [utils.emotes.cult, utils.emotes.lostHallsKey, utils.emotes.planewalker, utils.emotes.armorBreak, utils.emotes.warrior, utils.emotes.paladin, utils.emotes.knight, utils.emotes.wizard, utils.emotes.marbleSeal, utils.emotes.fungalTome, utils.emotes.trickster, utils.emotes.nitro];
                        preReacts = [utils.emotes.lostHallsKey, utils.emotes.planewalker, utils.emotes.armorBreak, utils.emotes.nitro];
                        break;
                    case "fullskip":
                        runType = "Full-Skip Void";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s AFK Check")
                            .setThumbnail("https://cdn.discordapp.com/emojis/899193984444940300.png")
                            .setDescription("React with " + utils.emotes.fullSkip + " if you are coming.\nReact with " + utils.emotes.lostHallsKey + " if you have a key.\nReact with " + utils.emotes.vial + " if you have a vial\nOtherwise react with your gear/class choices below.")
                            .setColor("#250BC0");
                        reacts = [utils.emotes.fullSkip, utils.emotes.lostHallsKey, utils.emotes.vial, utils.emotes.mystic, utils.emotes.brain, utils.emotes.armorBreak, utils.emotes.warrior, utils.emotes.paladin, utils.emotes.knight, utils.emotes.wizard, utils.emotes.marbleSeal, utils.emotes.fungalTome, utils.emotes.trickster, utils.emotes.nitro];
                        preReacts = [utils.emotes.lostHallsKey, utils.emotes.vial, utils.emotes.mystic, utils.emotes.brain, utils.emotes.armorBreak, utils.emotes.nitro];
                        break;
                    case "oryx3":
                        runType = "Oryx 3";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s AFK Check")
                            .setThumbnail("https://cdn.discordapp.com/emojis/924661866192580628.png")
                            .setDescription("React with " + utils.emotes.o3 + " if you are coming.\nReact with " + utils.emotes.inc + " if you have an inc.\nReact with " + utils.emotes.trickster + " if you are able to bring a rushing class.\nReact with " + utils.emotes.decaRing + " to help us buy runes!\nOtherwise react with your gear/class choices below.")
                            .setColor("#FFEE59");
                        reacts = [utils.emotes.o3, utils.emotes.inc, utils.emotes.decaRing, utils.emotes.helmetRune, utils.emotes.swordRune, utils.emotes.shieldRune, utils.emotes.warrior, utils.emotes.knight, utils.emotes.paladin, utils.emotes.priest, utils.emotes.bard, utils.emotes.marbleSeal, utils.emotes.slow, utils.emotes.mystic, utils.emotes.trickster, utils.emotes.nitro];
                        preReacts = [utils.emotes.inc, utils.emotes.helmetRune, utils.emotes.swordRune, utils.emotes.shieldRune, utils.emotes.nitro];
                        break;
                    case "shatters":
                        runType = "Shatters";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s AFK Check")
                            .setThumbnail("https://cdn.discordapp.com/attachments/748200247716479159/890001562620035122/unknown.png")
                            .setDescription("React with " + utils.emotes.shatters + " if you are coming.\nReact with " + utils.emotes.shattersKey + " if you have a key.\nReact with " + utils.emotes.planewalker + " if you are able to rush.\nOtherwise react with your gear/class choices below.")
                            .setColor("#254525");
                        reacts = [utils.emotes.shatters, utils.emotes.shattersKey, utils.emotes.planewalker, utils.emotes.fungalTome, utils.emotes.warrior, utils.emotes.paladin, utils.emotes.knight, utils.emotes.ogmur, utils.emotes.marbleSeal, utils.emotes.rangedDps, utils.emotes.slow, utils.emotes.curse, utils.emotes.expose, utils.emotes.nitro];
                        preReacts = [utils.emotes.shattersKey, utils.emotes.planewalker, utils.emotes.fungalTome, utils.emotes.nitro];
                        break;
                    case "nest":
                        runType = "Nest";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s AFK Check")
                            .setThumbnail("https://i.imgur.com/hUWc3IV.png")
                            .setDescription("React with " + utils.emotes.nest + " if you are coming.\nReact with " + utils.emotes.nestKey + " if you have a key.\nOtherwise react with your gear/class choices below.")
                            .setColor("#F27500");
                        reacts = [utils.emotes.nest, utils.emotes.nestKey, utils.emotes.qot, utils.emotes.knight, utils.emotes.warrior, utils.emotes.paladin, utils.emotes.trickster, utils.emotes.slow, utils.emotes.curse, utils.emotes.expose, utils.emotes.daze, utils.emotes.nitro];
                        preReacts = [utils.emotes.nestKey, utils.emotes.qot, utils.emotes.nitro];
                        break;
                    case "fungal":
                        runType = "Fungal Cavern";
                        embed.setTitle((interaction.member.nickname != null ? interaction.member.nickname : interaction.user.tag) + "'s AFK Check")
                            .setThumbnail("https://i.imgur.com/K6rOQzR.png")
                            .setDescription("React with " + utils.emotes.fungal + " if you are coming.\nReact with " + utils.emotes.fungalKey + " if you have a key.\nReact with " + utils.emotes.planewalker + " if you are able to bring a rushing class.\nOtherwise react with your gear/class choices below.")
                            .setColor("#52326A");
                        reacts = [utils.emotes.fungal, utils.emotes.fungalKey, utils.emotes.warrior, utils.emotes.knight, utils.emotes.paladin, utils.emotes.priest, utils.emotes.trickster, utils.emotes.bard, utils.emotes.expose, utils.emotes.marbleSeal, utils.emotes.qot, utils.emotes.armorBreak, utils.emotes.slow, utils.emotes.mystic, utils.emotes.fungalTome, utils.emotes.planewalker, utils.emotes.nitro];
                        preReacts = [utils.emotes.fungalKey, utils.emotes.nitro];
                        break;
                    default:
                        embed.setTitle("AFK Check failed")
                            .setDescription("Invalid argument. Please use `" + config.prefix + "afkcheck <void/cult/fullskip/o3/shatters/nest/fungal> <location>`")
                            .setColor("#FF0000");
                        break;
                }


                if (runType != "invalid") {
                    embed.setDescription("A " + runType + " run has started in " + voiceChannel.toString() + "\n" + embed.description);
                    embed.setFooter({ text: "AFK check will end in 5m" });
                }
                embed.setTimestamp(Date.now());
                if (reacts.length != 0) {

                    var runId = uuid();
                    connection.query("SELECT ign FROM users WHERE userId=\"" + interaction.user.id + "\";", async function(err, result) {
                        if (err || result[0] === undefined) {
                            embed = new Discord.MessageEmbed()
                                .setTitle("AFK Check failed")
                                .setDescription("Internal error, please try again later." + (err ? "\n" + err.message : ""))
                                .setColor("#FF0000");
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        } else {
                            voiceChannel.setName(result[0].ign + "'s " + runType).catch(err => console.log(err));
                            voiceChannel.permissionOverwrites.create(interaction.guild.roles.cache.find(r => r.id === config.verifiedRoleId), { "CONNECT": false, "VIEW_CHANNEL": true });

                            var startTime = new Date();
                            startTime = startTime.getFullYear() + "-" + ("0" + (startTime.getMonth() + 1)).slice(-2) + "-" + ("0" + startTime.getDate()).slice(-2) + " " + ("0" + startTime.getHours()).slice(-2) + ":" + ("0" + startTime.getMinutes()).slice(-2) + ":" + ("0" + startTime.getSeconds()).slice(-2);

                            connection.query("INSERT INTO runs (id, type, location, raidLeader, voiceChannel, started, ended, startTime, playerList) VALUES (\"" + runId + "\", \"" + runType + "\", \"" + interaction.options.get("location").value + "\", \"" + result[0].ign + "\", \"" + voiceChannel.id + "\", false, false, \"" + startTime + "\", \'{\"userId\":\"" + interaction.user.id + "\", \"ign\":\"" + result[0].ign + "\"}\');", function(err) {

                                var confirmEmbed = new Discord.MessageEmbed()
                                    .setDescription("Started AFK check for " + runType + ".\nCheck " + client.channels.cache.get(config.activeRuns).toString() + " for AFK check controls.")
                                    .setColor("#00FF00");
                                interaction.reply({ embeds: [confirmEmbed], ephemeral: true });

                                var controlEmbed = new Discord.MessageEmbed()
                                    .setTitle(interaction.user.tag + "'s AFK Check")
                                    .setDescription("React with " + utils.emotes.openVc + " to open the voice channel.\nReact with " + utils.emotes.endAfk + " to end the AFK check.\nReact with " + utils.emotes.endRun + " to end the run.\nReact with " + utils.emotes.abortAfk + " to abort the AFK check.")
                                    .setColor(embed.color)
                                    .setThumbnail(embed.thumbnail.url)
                                    .addField("Type", runType, true)
                                    .addField("Location", interaction.options.get("location").value, true)
                                    .addField("UUID", runId)
                                    .setTimestamp();

                                client.channels.cache.find(c => c.id === config.activeRuns).send({ embeds: [controlEmbed] }).then(control => {

                                    control.react(utils.emotes.openVc).then(() => {
                                        control.react(utils.emotes.endAfk).then(() => {
                                            control.react(utils.emotes.endRun).then(() => {
                                                control.react(utils.emotes.abortAfk).then(() => {

                                                    var ended = false;
                                                    var aborted = false;

                                                    channel.send({ content: "@ here", embeds: [embed] }).then(async afkcheck => {

                                                        for (i in reacts) {
                                                            utils.addReaction(reacts[i], afkcheck);
                                                        }

                                                        var openVcFilter = (reaction, user) => user.id != client.user.id;
                                                        var endAfkFilter = (reaction, user) => user.id != client.user.id;
                                                        var endRunFilter = (reaction, user) => user.id != client.user.id;
                                                        var abortAfkFilter = (reaction, user) => user.id != client.user.id;
                                                        var portalFilter = (reaction, user) => user.id != client.user.id;
                                                        var keyFilter = (reaction, user) => user.id != client.user.id;
                                                        var nitroFilter = (reaction, user) => user.id != client.user.id;
                                                        var vialFilter = (reaction, user) => user.id != client.user.id;
                                                        var armorBreakFilter = (reaction, user) => user.id != client.user.id;
                                                        var qotFilter = (reaction, user) => user.id != client.user.id;
                                                        var rusherFilter = (reaction, user) => user.id != client.user.id;
                                                        var openVc = control.createReactionCollector({ openVcFilter });
                                                        var endAfk = control.createReactionCollector({ endAfkFilter });
                                                        var endRun = control.createReactionCollector({ endRunFilter });
                                                        var abortAfk = control.createReactionCollector({ abortAfkFilter });
                                                        var portal = afkcheck.createReactionCollector({ portalFilter });
                                                        var key = afkcheck.createReactionCollector({ keyFilter });
                                                        var nitro = afkcheck.createReactionCollector({ nitroFilter });
                                                        var vial = afkcheck.createReactionCollector({ vialFilter });
                                                        var armorBreak = afkcheck.createReactionCollector({ armorBreakFilter });
                                                        var qot = afkcheck.createReactionCollector({ qotFilter });
                                                        var rusher = afkcheck.createReactionCollector({ rusherFilter });

                                                        var countdownMessage;

                                                        openVc.on("collect", (emoji, user) => {
                                                            if (ended || aborted) return;
                                                            if (user.id === config.botId) return;
                                                            if (emoji._emoji.name != utils.emotes.openVc) return;
                                                            var i = 0;
                                                            afkcheck.reply("**Voice channel will open in 5...**").then(countdown => {
                                                                countdownMessage = countdown;
                                                                var countdownInterval = setInterval(function() {
                                                                    i++;
                                                                    if (i > 4) {
                                                                        voiceChannel.permissionOverwrites.create(interaction.guild.roles.cache.find(r => r.id === config.verifiedRoleId), { "CONNECT": true, "VIEW_CHANNEL": true });
                                                                        countdown.edit("**Voice channel is open.**");
                                                                        return clearInterval(countdownInterval);
                                                                    }
                                                                    countdown.edit("**Voice channel will open in " + (5 - i) + "...**");
                                                                }, 1000);
                                                            });
                                                        });

                                                        endAfk.on("collect", (emoji, user) => {
                                                            if (ended || aborted) return;
                                                            if (user.id === config.botId) return;
                                                            if (emoji._emoji.name != utils.emotes.endAfk) return;
                                                            connection.query("UPDATE runs SET started=true WHERE id=\"" + runId + "\";", function(err) {
                                                                voiceChannel.permissionOverwrites.create(interaction.guild.roles.cache.find(r => r.id === config.verifiedRoleId), { "CONNECT": false, "VIEW_CHANNEL": true });
                                                                control.embeds[0].setFooter({ text: "AFK check has ended" });
                                                                control.edit({ embeds: [control.embeds[0]] });
                                                                afkcheck.embeds[0].setFooter({ text: "AFK check has ended" });
                                                                afkcheck.embeds[0].setDescription("AFK check was ended by " + user.toString() + ".\nJoin lounge then use the command `" + config.prefix + "join` if you were moved out to be moved back in.");
                                                                afkcheck.edit({ embeds: [afkcheck.embeds[0]] });
                                                                if (countdownMessage) countdownMessage.delete().catch(err => {});
                                                                ended = true;
                                                            });
                                                            return clearInterval(update);
                                                        });

                                                        endRun.on("collect", (emoji, user) => {
                                                            if (aborted) return;
                                                            if (user.id === config.botId) return;
                                                            if (emoji._emoji.name != utils.emotes.endRun) return;
                                                            utils.disconnectMembers(voiceChannel);
                                                            voiceChannel.permissionOverwrites.create(interaction.guild.roles.cache.find(r => r.id === config.verifiedRoleId), { "CONNECT": false, "VIEW_CHANNEL": false });
                                                            connection.query("UPDATE runs SET ended=true WHERE id=\"" + runId + "\";", function(err) {
                                                                connection.query("SELECT startTime FROM runs WHERE id=\"" + runId + "\";", function(err, runs) {
                                                                    var now = new Date();
                                                                    var hours = Math.floor((now - new Date(runs[0].startTime)) / 1000 / 60 / 60);
                                                                    var minutes = Math.floor((now - new Date(runs[0].startTime)) / 1000 / 60 - (hours * 60));
                                                                    var seconds = Math.floor((now - new Date(runs[0].startTime)) / 1000 - (minutes * 60));
                                                                    if (runs[0] === undefined) return;
                                                                    control.embeds[0].setFooter({ text: "Run has ended" });
                                                                    control.edit({ embeds: [control.embeds[0]] });
                                                                    afkcheck.embeds[0].setFooter({ text: "Run has ended" });
                                                                    afkcheck.embeds[0].setDescription("Run ended by " + user.toString() + ".\nRun time: " + (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "m" : "") + (seconds.toString().length === 2 ? seconds : "0" + seconds) + "s.");
                                                                    afkcheck.edit({ embeds: [afkcheck.embeds[0]] });
                                                                    if (countdownMessage) countdownMessage.delete().catch(err => {});
                                                                    ended = true;
                                                                    voiceChannel.setName("Raiding " + (config.raidingChannels.indexOf(voiceChannel.id) + 1));
                                                                    openVc.stop();
                                                                    endAfk.stop();
                                                                    endRun.stop();
                                                                    abortAfk.stop();
                                                                    portal.stop();
                                                                    key.stop();
                                                                    nitro.stop();
                                                                    vial.stop();
                                                                    armorBreak.stop();
                                                                    qot.stop();
                                                                    rusher.stop();
                                                                    return clearInterval(update);
                                                                });
                                                            });
                                                        });

                                                        abortAfk.on("collect", (emoji, user) => {
                                                            if (user.id === config.botId) return;
                                                            if (emoji._emoji.name != utils.emotes.abortAfk) return;
                                                            if (ended) return;
                                                            utils.disconnectMembers(voiceChannel);
                                                            voiceChannel.permissionOverwrites.create(interaction.guild.roles.cache.find(r => r.id === config.verifiedRoleId), { "CONNECT": false, "VIEW_CHANNEL": false });
                                                            connection.query("UPDATE runs SET ended=true WHERE id=\"" + runId + "\";", function(err) {
                                                                control.embeds[0].setFooter({ text: "AFK check aborted" });
                                                                control.edit({ embeds: [control.embeds[0]] });
                                                                afkcheck.embeds[0].setFooter({ text: "AFK check aborted" });
                                                                afkcheck.embeds[0].setDescription("AFK check has been aborted by " + user.toString() + ".");
                                                                afkcheck.edit({ embeds: [afkcheck.embeds[0]] });
                                                                if (countdownMessage) countdownMessage.delete().catch(err => {});
                                                                voiceChannel.setName("Raiding " + (config.raidingChannels.indexOf(voiceChannel.id) + 1));
                                                                ended = true;
                                                                if (!aborted) aborted = true;
                                                                openVc.stop();
                                                                endAfk.stop();
                                                                endRun.stop();
                                                                abortAfk.stop();
                                                                portal.stop();
                                                                key.stop();
                                                                nitro.stop();
                                                                vial.stop();
                                                                armorBreak.stop();
                                                                qot.stop();
                                                                rusher.stop();
                                                                return clearInterval(update);
                                                            });
                                                        });

                                                        portal.on("collect", (emoji, user) => {
                                                            if (ended || aborted) return;
                                                            if (user.id === config.botId) return;
                                                            if (emoji._emoji.name != reacts[0].split(":")[1]) return;
                                                            connection.query("SELECT playerList FROM runs WHERE id=\"" + runId + "\";", function(err, runs) {
                                                                if (runs[0] === undefined) return;
                                                                var players = [];

                                                                for (i in runs[0].playerList.split(";")) {
                                                                    players.push(JSON.parse(runs[0].playerList.split(";")[i]));
                                                                }

                                                                var isInRun = false;

                                                                for (i in players) {
                                                                    if (players[i].userId === user.id) isInRun = true;
                                                                }

                                                                if (isInRun) return;

                                                                connection.query("SELECT ign FROM users WHERE userId=\"" + user.id + "\";", function(err, users) {
                                                                    players.push({ user: user.id, ign: users[0] != undefined ? users[0].ign : user.username });

                                                                    for (i in players) {
                                                                        players[i] = JSON.stringify(players[i]);
                                                                    }

                                                                    connection.query("UPDATE runs SET playerList=\'" + players.join(";") + "\' WHERE id=\"" + runId + "\";", function(err) {});
                                                                });
                                                            });
                                                        });

                                                        key.on("collect", (emoji, user) => {
                                                            if (ended || aborted) return;
                                                            if (user.id === config.botId) return;
                                                            if (emoji._emoji.name != preReacts[0].split(":")[1]) return;
                                                            connection.query("SELECT * FROM runs WHERE id=\"" + runId + "\";", function(err, runs) {
                                                                if (runs[0] === undefined) return;
                                                                var keys = [];

                                                                if (runs[0].dungKeys != null) {
                                                                    for (i in runs[0].dungKeys.split(";")) {
                                                                        keys.push(JSON.parse(runs[0].dungKeys.split(";")[i]));
                                                                    }
                                                                }

                                                                var isKey = false;

                                                                for (i in keys) {
                                                                    if (keys[i].userId === user.id) isKey = true;
                                                                }

                                                                if (isKey) return;

                                                                var keyEmbed = new Discord.MessageEmbed()
                                                                    .setTitle("Key confirmation for " + result[0].ign + "'s " + runType)
                                                                    .setDescription("Please confirm that you have " + (preReacts[0].includes("inc") ? "an " : "a ") + preReacts[0]);
                                                                user.createDM().then(dm => {
                                                                    dm.send({ embeds: [keyEmbed] }).then(embed => {
                                                                        embed.react("✅").then(() => {
                                                                            embed.react("❌").then(() => {
                                                                                var confirmFilter = (reaction, user) => user.id != client.user.id;
                                                                                var cancelFilter = (reaction, user) => user.id != client.user.id;
                                                                                var confirm = embed.createReactionCollector({ confirmFilter, time: 30000 });
                                                                                var cancel = embed.createReactionCollector({ cancelFilter, time: 30000 });

                                                                                confirm.on("collect", (emoji, user) => {
                                                                                    if (emoji._emoji.name != "✅") return;
                                                                                    connection.query("SELECT ign FROM users WHERE userId=\"" + user.id + "\";", function(err, users) {

                                                                                        if (runs[0].dungKeys != null) {
                                                                                            for (i in runs[0].dungKeys.split(";")) {
                                                                                                keys.push(JSON.parse(runs[0].dungKeys.split(";")[i]));
                                                                                            }
                                                                                        } else {
                                                                                            var newDesc = [];
                                                                                            for (i in afkcheck.embeds[0].description.split("\n")) {
                                                                                                if (afkcheck.embeds[0].description.split("\n")[i].includes(preReacts[0])) newDesc.push("Thank you to " + client.guilds.cache.get(config.guildId).members.cache.get(user.id).toString() + " for popping " + (preReacts[0].includes("inc") ? "an " : "a ") + preReacts[0] + " for us!");
                                                                                                else newDesc.push(afkcheck.embeds[0].description.split("\n")[i]);
                                                                                            }

                                                                                            var newafkcheck = new Discord.MessageEmbed()
                                                                                                .setTitle(afkcheck.embeds[0].title)
                                                                                                .setThumbnail(afkcheck.embeds[0].thumbnail.url)
                                                                                                .setDescription(newDesc.join("\n"))
                                                                                                .setColor(afkcheck.embeds[0].color)
                                                                                                .setFooter(afkcheck.embeds[0].footer)
                                                                                                .setTimestamp(afkcheck.embeds[0].timestamp);
                                                                                            afkcheck.edit({ content: "@ here", embeds: [newafkcheck] });
                                                                                        }

                                                                                        keys.push({ userId: user.id, ign: users[0] != undefined ? users[0].ign : user.username });

                                                                                        for (i in keys) {
                                                                                            keys[i] = JSON.stringify(keys[i]);
                                                                                        }

                                                                                        if (keys.length < 2) {
                                                                                            connection.query("UPDATE runs SET dungKeys=\'" + keys.join(";") + "\' WHERE id=\"" + runId + "\";", function(err) {
                                                                                                dm.send("Confirmed! The location is `" + interaction.options.get("location").value + "`\nPlease get there and trade **" + result[0].ign + "**");

                                                                                                if (!interaction.guild.members.cache.get(user.id).voice.channel) {
                                                                                                    dm.send("Failed to auto-drag, couldn't find you in a voice channel. Please join " + interaction.guild.channels.cache.get(config.lounge).toString() + " and use `/join` to get dragged in.");
                                                                                                } else {
                                                                                                    if (interaction.guild.members.cache.get(user.id).voice.channel.id != runs[0].voiceChannel) interaction.guild.members.cache.get(user.id).voice.setChannel(interaction.guild.channels.cache.get(runs[0].voiceChannel));
                                                                                                }
                                                                                            });
                                                                                        } else {
                                                                                            connection.query("UPDATE runs SET dungKeys=\'" + keys.join(";") + "\' WHERE id=\"" + runId + "\";", function(err) {
                                                                                                dm.send("Another key has already confirmed.");
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                });

                                                                                cancel.on("collect", (emoji, user) => {
                                                                                    if (emoji._emoji.name != "❌") return;
                                                                                });
                                                                            });
                                                                        });
                                                                    }).catch(err => console.log(err));
                                                                });
                                                            });
                                                        });

                                                        vial.on("collect", (emoji, user) => {
                                                            if (ended || aborted) return;
                                                            if (user.id === config.botId) return;
                                                            if (emoji._emoji.name != utils.emotes.vial.split(":")[1]) return;
                                                            if (runType != "Void" && runType != "Full-Skip Void") return;
                                                            connection.query("SELECT * FROM runs WHERE id=\"" + runId + "\";", function(err, runs) {
                                                                if (runs[0] === undefined) return;
                                                                var vials = [];

                                                                if (runs[0].vials != null) {
                                                                    for (i in runs[0].vials.split(";")) {
                                                                        vials.push(JSON.parse(runs[0].vials.split(";")[i]));
                                                                    }
                                                                }

                                                                var isVial = false;

                                                                for (i in vials) {
                                                                    if (vials[i].userId === vials.id) isVial = true;
                                                                }

                                                                if (isVial) return;

                                                                var vialEmbed = new Discord.MessageEmbed()
                                                                    .setTitle("Key confirmation for " + result[0].ign + "'s " + runType)
                                                                    .setDescription("Please confirm that you have a " + utils.emotes.vial);
                                                                user.createDM().then(dm => {
                                                                    dm.send({ embeds: [vialEmbed] }).then(embed => {
                                                                        embed.react("✅").then(() => {
                                                                            embed.react("❌").then(() => {
                                                                                var confirmFilter = (reaction, user) => user.id != client.user.id;
                                                                                var cancelFilter = (reaction, user) => user.id != client.user.id;
                                                                                var confirm = embed.createReactionCollector({ confirmFilter, time: 30000 });
                                                                                var cancel = embed.createReactionCollector({ cancelFilter, time: 30000 });

                                                                                confirm.on("collect", (emoji, user) => {
                                                                                    if (emoji._emoji.name != "✅") return;
                                                                                    connection.query("SELECT ign FROM users WHERE userId=\"" + user.id + "\";", function(err, users) {

                                                                                        if (runs[0].vials != null) {
                                                                                            for (i in runs[0].vials.split(";")) {
                                                                                                vials.push(JSON.parse(runs[0].vials.split(";")[i]));
                                                                                            }
                                                                                        } else {
                                                                                            var newDesc = [];
                                                                                            for (i in afkcheck.embeds[0].description.split("\n")) {
                                                                                                if (afkcheck.embeds[0].description.split("\n")[i].includes(utils.emotes.vial)) newDesc.push("Thank you to " + client.guilds.cache.get(config.guildId).members.cache.get(user.id).toString() + " for popping a " + utils.emotes.vial + " for us!");
                                                                                                else newDesc.push(afkcheck.embeds[0].description.split("\n")[i]);
                                                                                            }

                                                                                            var newafkcheck = new Discord.MessageEmbed()
                                                                                                .setTitle(afkcheck.embeds[0].title)
                                                                                                .setThumbnail(afkcheck.embeds[0].thumbnail.url)
                                                                                                .setDescription(newDesc.join("\n"))
                                                                                                .setColor(afkcheck.embeds[0].color)
                                                                                                .setFooter(afkcheck.embeds[0].footer)
                                                                                                .setTimestamp(afkcheck.embeds[0].timestamp);
                                                                                            afkcheck.edit({ content: "@ here", embeds: [newafkcheck] });
                                                                                        }

                                                                                        vials.push({ userId: user.id, ign: users[0] != undefined ? users[0].ign : user.username });

                                                                                        for (i in vials) {
                                                                                            vials[i] = JSON.stringify(vials[i]);
                                                                                        }

                                                                                        if (vials.length < 2) {
                                                                                            connection.query("UPDATE runs SET vials=\'" + vials.join(";") + "\' WHERE id=\"" + runId + "\";", function(err) {
                                                                                                dm.send("Confirmed! The location is `" + interaction.options.get("location").value + "`\nPlease get there and trade **" + result[0].ign + "**");

                                                                                                if (!interaction.guild.members.cache.get(user.id).voice.channel) {
                                                                                                    dm.send("Failed to auto-drag, couldn't find you in a voice channel. Please join " + interaction.guild.channels.cache.get(config.lounge).toString() + " and use `/join` to get dragged in.");
                                                                                                } else {
                                                                                                    if (!interaction.guild.members.cache.get(user.id).voice.channel.id === runs[0].voiceChannel) interaction.guild.members.cache.get(user.id).voice.setChannel(interaction.guild.channels.cache.get(runs[0].voiceChannel));
                                                                                                }
                                                                                            });
                                                                                        } else {
                                                                                            connection.query("UPDATE runs SET vials=\'" + vials.join(";") + "\' WHERE id=\"" + runId + "\";", function(err) {
                                                                                                dm.send("Another vial has already confirmed.");
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                });

                                                                                cancel.on("collect", (emoji, user) => {
                                                                                    if (emoji._emoji.name != "❌") return;
                                                                                });
                                                                            });
                                                                        });
                                                                    }).catch(err => console.log(err));
                                                                });
                                                            });
                                                        });

                                                        armorBreak.on("collect", (emoji, user) => {
                                                            if (ended || aborted) return;
                                                            if (user.id === config.botId) return;
                                                            if (emoji._emoji.name != utils.emotes.armorBreak.split(":")[1]) return;
                                                            if (runType != "Void" && runType != "Full-Skip Void" && runType != "Nest") return;
                                                        });

                                                        qot.on("collect", (emoji, user) => {
                                                            if (ended || aborted) return;
                                                            if (user.id === config.botId) return;
                                                            if (emoji._emoji.name != utils.emotes.qot.split(":")[1]) return;
                                                            if (runType != "Nest") return;
                                                        });

                                                        rusher.on("collect", (emoji, user) => {
                                                            if (ended || aborted) return;
                                                            if (user.id === config.botId) return;
                                                            if (emoji._emoji.name != utils.emotes.planewalker.split(":")[1]) return;
                                                            if (runType != "Cult") return;
                                                        });

                                                        nitro.on("collect", (emoji, user) => {
                                                            if (ended || aborted) return;
                                                            if (user.id === config.botId) return;
                                                            if (emoji._emoji.name != utils.emotes.nitro.split(":")[1]) return;
                                                            if (!interaction.guild.members.cache.get(user.id).roles.cache.has(config.boosterRoleId)) return;
                                                            connection.query("SELECT location FROM runs WHERE id=\"" + runId + "\";", function(err, result) {
                                                                user.createDM().then(dm => {
                                                                    dm.send("The location is `" + interaction.options.get("location").value + "`");
                                                                });
                                                            });
                                                        });

                                                        var lastTime = 300;
                                                        var update = setInterval(function() {
                                                            lastTime -= 30;
                                                            if (lastTime === 0) {
                                                                utils.disconnectMembers(voiceChannel);
                                                                voiceChannel.permissionOverwrites.create(interaction.guild.roles.cache.find(r => r.id === config.verifiedRoleId), { "CONNECT": false, "VIEW_CHANNEL": false });
                                                                connection.query("UPDATE runs SET ended=true WHERE id=\"" + runId + "\";", function(err) {
                                                                    control.edit({ embeds: [controlEmbed.setFooter({ text: "AFK check aborted" })] });
                                                                    afkcheck.edit({ embeds: [embed.setFooter({ text: "AFK check aborted" })] });
                                                                    afkcheck.embeds[0].setFooter({ text: "AFK check aborted" });
                                                                    afkcheck.embeds[0].setDescription("Timed out, AFK check has been aborted.");
                                                                    afkcheck.edit({ embeds: [afkcheck.embeds[0]] });
                                                                    if (countdownMessage) countdownMessage.delete().catch(err => {});
                                                                    voiceChannel.setName("Raiding " + (config.raidingChannels.indexOf(voiceChannel.id) + 1));
                                                                    ended = true;
                                                                    if (!aborted) aborted = true;
                                                                    openVc.stop();
                                                                    endAfk.stop();
                                                                    endRun.stop();
                                                                    abortAfk.stop();
                                                                    portal.stop();
                                                                    key.stop();
                                                                    nitro.stop();
                                                                    vial.stop();
                                                                    armorBreak.stop();
                                                                    qot.stop();
                                                                    rusher.stop();
                                                                    return clearInterval(update);
                                                                });
                                                            }
                                                            var minutes = Math.floor(lastTime / 60);
                                                            var seconds = lastTime - minutes * 60;
                                                            var newAfkcheck = new Discord.MessageEmbed()
                                                                .setTitle(afkcheck.embeds[0].title)
                                                                .setThumbnail(afkcheck.embeds[0].thumbnail.url)
                                                                .setDescription(afkcheck.embeds[0].description)
                                                                .setColor(afkcheck.embeds[0].color)
                                                                .setFooter({ text: "AFK check will end in " + (minutes > 0 ? minutes + "m" : "") + (seconds > 0 ? seconds + "s" : "") })
                                                                .setTimestamp(afkcheck.embeds[0].timestamp);
                                                            afkcheck.edit({ embeds: [newAfkcheck] });
                                                        }, 30000);
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    });
                } else interaction.reply({ embeds: [embed], ephemeral: true });
            });
        } else return utils.messages.missingPermissions(interaction);
    }).catch(err => {
        console.log(err);
    });
};

module.exports.info = {
    name: "afkcheck",
    aliases: ["afk", "ac"],
    description: "Start an AFK check for a run",
    options: [{
        name: "dungeon",
        description: "The dungeon you want to create an AFK check for",
        type: 3,
        required: true,
        choices: [{ name: "Void", value: "void" }, { name: "Full-Skip Void", value: "fullskip" }, { name: "Cult", value: "cult" }, { name: "Nest", value: "nest" }, { name: "Oryx 3", value: "oryx3" }, { name: "Shatters", value: "shatters" }, { name: "Fungal Cavern", value: "fungal" }, { name: "Crystal Cavern", value: "fungal" }]
    }, {
        name: "location",
        description: "The location of your run",
        type: 3,
        required: true
    }],
    usage: "afkcheck <dungeon>",
    restricted: "Organizer"
};