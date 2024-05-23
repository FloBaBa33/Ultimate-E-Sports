require ( "dotenv" ).config ()
const { Client, IntentsBitField, EmbedBuilder, ChannelType, ApplicationCommandOptionType, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require ( "discord.js" )
const { writeFile } = require ( "fs" )

const client = new Client ({
    intents: [
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildMessages
    ]
})

//Helper Functions

/**
 * 
 * @param { number } ms - the time to stop for (in milisec.)
 * @returns { * } -nothing
 */
async function wait ( ms ) { return new Promise ( res => setTimeout ( res, ms )) }

const embeds = [
    {//rule embed
        name: "rules_1",
        embed: new EmbedBuilder ()
        .setTitle ( "Die Regeln dieses Servers" )
        .setColor ( "Blue" )
        .addFields ([
            { name: "__$1__", value: "Respektvoller Umgang mit allen!\nBelästigung, Sexismus oder Rassismus werden nicht toleriert und können mit einem Ban bestraft werden!", inline: false },
            { name: "__$2__", value: "Ohne Berechtigung von unserem Staffteam darf keine Eigenwerbung in Allgemeinen Chats betrieben werden!", inline: false },
            { name: "__$3__", value: "__Keine anstößigen Inhalte teilen.__\nDazu zählen Texte, Bilder oder Links mit Nacktheit, Sex, schwerer Gewalt oder anderen grafisch verstörenden Inhalten.", inline: false },
            { name: "__$4__", value: "Das Aufnehmen von Nutzern in den Voice-Channels (egal ob Foto-, Video- oder Tonaufnahmen) ist verboten, außer es wurde klar und deutlich eingewilligt. Ebenso ist das Versenden von eigenen privaten Daten, sowie von anderen Usern, nicht gestattet.", inline: false },
            { name: "__$5__", value: "Störgeräusche , Stimmverzerrer oder sonstige Stör-Arten eines angenehmen Miteinanders sind untersagt.\nAusgenommen hier ist das Soundboard von Discord solange andere User nicht belästigt werden!", inline: false },
            { name: "__$6__", value: "Dem Staffteam ist mit Respekt zu begegnen und Ihren Anweisungen sind folge zu leisten.", inline: false },
            { name: "__$7__", value: "Wenn du etwas siehst, das gegen die Regeln verstößt, oder wodurch du dich nicht sicher fühlst, dann benachrichtige die Mitarbeiter! Wir möchten, dass dieser Server ein Ort ist, an dem sich jeder Willkommen & Sicher fühlen soll.", inline: false },
            { name: "__$8__", value: "Zusätzlich zu den oben genannten Regeln gelten natürlich auch die [allgemainen Discord-Regeln](https://discord.com/guidelines).", inline: false },
        ])
        .setFooter ({ text: "Den Serverregeln wird automatisch mit dem Beitritt des Servers zugestimmt. Wir behalten uns vor, die Regeln jederzeit zu erweitern oder entfernen." }),
        actionRaw: [
            new ButtonBuilder ().setCustomId ( "rules-1225515002027315250" ).setLabel ( "Accept" ).setStyle ( ButtonStyle.Success ).setEmoji ( '✔️' )
        ],
        raw: 1,
    },
    {//pronoun reaction role embed
        name: "reactionRole_pronoun",
        embed: new EmbedBuilder ()
        .setTitle ( "Wähle hier deine Pronomen aus" )
        .setColor ( "Blue" ),
        actionRaw: [
            new ButtonBuilder ().setCustomId ( "rr-pronouns-1227349054346760323" ).setLabel ( "He/Him" ).setStyle ( ButtonStyle.Danger ),
            new ButtonBuilder ().setCustomId ( "rr-pronouns-1227349143983362080" ).setLabel ( "She/Her" ).setStyle ( ButtonStyle.Success ),
            new ButtonBuilder ().setCustomId ( "rr-pronouns-1227349180289126410" ).setLabel ( "They/Them" ).setStyle ( ButtonStyle.Primary )
        ],
        raw: 1,
    },
    {//interessen reaction role embed
        name: "reactionRole_interesse",
        embed: new EmbedBuilder ()
        .setTitle ( "Wähle hier deine Interessens-Rollen aus" )
        .setColor ( "Blue" ),
        actionRaw: [
            new ButtonBuilder ().setCustomId ( "rr-interesse-1227349233359912970" ).setLabel ( "LoL" ).setStyle ( ButtonStyle.Success ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1227349262749274193" ).setLabel ( "Valorant" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1227349387559309332" ).setLabel ( "EA FC" ).setStyle ( ButtonStyle.Danger ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1234587360268652667" ).setLabel ( "Counterstrike" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1234587499528196126" ).setLabel ( "Fortnite" ).setStyle ( ButtonStyle.Success ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1234587603521507481" ).setLabel ( "Minecraft" ).setStyle ( ButtonStyle.Success ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1234587759738359982" ).setLabel ( "Lethal Company" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1234587828525076601" ).setLabel ( "Horror Spiele" ).setStyle ( ButtonStyle.Danger ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1236036090452775023" ).setLabel ( "Agility" ).setStyle ( ButtonStyle.Primary ),
        ],
        raw: 2,
        size: { 1: 5, 2: 4 },
    },
    {//pings reaction role embed
        name: "reactionRole_pings",
        embed: new EmbedBuilder ()
        .setTitle ( "Wähle hier deine Ping-Rollen aus" )
        .setColor ( "Blue" ),
        actionRaw: [
            new ButtonBuilder ().setCustomId ( "rr-ping-1234596961706049596" ).setLabel ( "Spielersuche" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-ping-1234597721948684379" ).setLabel ( "Bumps" ).setStyle ( ButtonStyle.Danger ),
            new ButtonBuilder ().setCustomId ( "rr-ping-1234597789057552445" ).setLabel ( "Streams" ).setStyle ( ButtonStyle.Success ),
            new ButtonBuilder ().setCustomId ( "rr-ping-1234597852861300757" ).setLabel ( "Ankündigungen" ).setStyle ( ButtonStyle.Primary ),
        ],
        raw: 1
    },
    {//pronoun reaction role embed
        name: "reactionRole_pronoun_blau",
        embed: new EmbedBuilder ()
        .setTitle ( "Wähle hier deine Pronomen aus" )
        .setColor ( "Blue" ),
        actionRaw: [
            new ButtonBuilder ().setCustomId ( "rr-pronouns-1227349054346760323" ).setLabel ( "He/Him" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-pronouns-1227349143983362080" ).setLabel ( "She/Her" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-pronouns-1227349180289126410" ).setLabel ( "They/Them" ).setStyle ( ButtonStyle.Primary )
        ],
        raw: 1,
    },
    {//interessen reaction role embed
        name: "reactionRole_interesse_blau",
        embed: new EmbedBuilder ()
        .setTitle ( "Wähle hier deine Interessens-Rollen aus" )
        .setColor ( "Blue" ),
        actionRaw: [
            new ButtonBuilder ().setCustomId ( "rr-interesse-1227349233359912970" ).setLabel ( "LoL" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1227349262749274193" ).setLabel ( "Valorant" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1227349387559309332" ).setLabel ( "EA FC" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1234587360268652667" ).setLabel ( "Counterstrike" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1234587499528196126" ).setLabel ( "Fortnite" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1234587603521507481" ).setLabel ( "Minecraft" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1234587759738359982" ).setLabel ( "Lethal Company" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1234587828525076601" ).setLabel ( "Horror Spiele" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-interesse-1236036090452775023" ).setLabel ( "Agility" ).setStyle ( ButtonStyle.Primary ),
        ],
        raw: 2,
        size: { 1: 5, 2: 4 },
    },
    {//pings reaction role embed
        name: "reactionRole_pings_blau",
        embed: new EmbedBuilder ()
        .setTitle ( "Wähle hier deine Ping-Rollen aus_blau" )
        .setColor ( "Blue" ),
        actionRaw: [
            new ButtonBuilder ().setCustomId ( "rr-ping-1234596961706049596" ).setLabel ( "Spielersuche" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-ping-1234597721948684379" ).setLabel ( "Bumps" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-ping-1234597789057552445" ).setLabel ( "Streams" ).setStyle ( ButtonStyle.Primary ),
            new ButtonBuilder ().setCustomId ( "rr-ping-1234597852861300757" ).setLabel ( "Ankündigungen" ).setStyle ( ButtonStyle.Primary ),
        ],
        raw: 1
    },
]

client.login ( process.env.TOKEN )

client.on ( "messageCreate", async ( message ) => {
    if ( message.author.id !== "607910928897540105" ) return
    if ( message.content.startsWith ( "simjoin" )) {
        client.emit ( "guildMemberAdd", message.member )
    }
    if ( message.content.startsWith ( "simleave" )) {
        client.emit ( "guildMemberRemove", message.member )
    }
    if ( message.content.startsWith ( "embed" )) {
        const embed = new EmbedBuilder ().addFields ([
            { name: "1", value: "1", inline: false },
            // { name: "2", value: "2", inline: false },
            // { name: "3", value: "3", inline: false },
            // { name: "4", value: "4", inline: false },
            // { name: "5", value: "5", inline: false },
            // { name: "6", value: "6", inline: false },
            // { name: "7", value: "7", inline: false },
            // { name: "8", value: "8", inline: false },
            // { name: "9", value: "9", inline: false },
            // { name: "10", value: "10", inline: false },
        ])
        const raw = new ActionRowBuilder ().addComponents([
            new ButtonBuilder ().setStyle ( ButtonStyle.Danger ).setCustomId ( "danger" ).setLabel ( "danger" ),
            new ButtonBuilder ().setStyle ( ButtonStyle.Link ).setLabel ( "link" ).setURL ( "https://www.google.de" ),
            new ButtonBuilder ().setStyle ( ButtonStyle.Primary ).setCustomId ( "primary" ).setLabel ( "primary" ),
            new ButtonBuilder ().setStyle ( ButtonStyle.Secondary ).setCustomId ( "secondary" ).setLabel ( "secondary" ),
            new ButtonBuilder ().setStyle ( ButtonStyle.Success ).setCustomId ( "sucess" ).setLabel ( "sucess" ),
        ])
        await message.reply ({ embeds: [ embed ], components: [ raw ]})
        console.log ( embed.data )
    }
})

client.on ( "ready", async ( bot ) => {
    console.log ( "ready" )
    console.log ( bot.user.username )
    console.log ( bot.guilds.cache.map ( g => g.name ))
    
    await bot.application.commands.fetch ({ force: true })
    const cmdList = bot.application.commands.cache.map ( cmd => [ cmd.name, cmd.id ])
    if ( !cmdList.includes ( "embed" )) {
        bot.application.commands.create ({
            name: "embed",
            description: "Use this command to send and Embed",
            defaultMemberPermissions: "Administrator",
            dmPermission: false,
            options: [
                {
                    name: "embed",
                    description: "The Embed that should be send",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    autocomplete: true
                }
            ]
        })
    }
})

client.on ( "error", async ( error) => {// error handling größtenteils dafür das falls mal errors aufkommen (zum beispiel durch eine latenz zwischen bot und discord) der Bot nicht abstürzt
    const now = new Date ()
    const fileName = `Error_${ now.getFullYear ()}-${ now.getMonth () + 1 }-${ now.getDate ()}_${ now.getHours ()}-${ now.getMinutes ()}-${ now.getSeconds ()}`
    writeFile ( `errors/${ fileName }`, `Error Name: "${ error.name }"\nError Message: "${ error.message }"`, function ( err ) {
        if ( err ) throw err
        console.log ( "Error Log created" )
    })
})

//Autocomplete handling
client.on ( "interactionCreate", async ( interaction ) => {
    if ( interaction.isAutocomplete ()) {
        if ( interaction.commandName === "embed" ) {
            const current = interaction.options.getFocused ( true )
            const filtered = embeds.map ( embed => embed.name ).filter ( element => {
                element = element.split ( ' ' )
                for ( let key in element ) {
                    if ( typeof element [ key ] === 'function' ) return false
                    if ( element [ key ].toLowerCase ().startsWith ( current.value.toLowerCase ())) return true
                }
            }).slice ( 0, 25 )
            return interaction.respond ( filtered.map (( element ) => ({ name: element, value: element })))
        }
    } else return
})

//Button Reaction Roles
client.on ( "interactionCreate" , async ( interaction ) => {
    if ( interaction.isButton ()) { // Reaction Role handling (auf button click werden rollen gegeben oder genommen)
        if ( interaction.customId.startsWith ( "rr-" )) {
            const split = interaction.customId.split ( "-" )
            if ( interaction.member.roles.cache.has ( split [ 2 ])) {
                await interaction.member.roles.remove ( split [ 2 ])
                await interaction.reply ({ embeds: [
                    new EmbedBuilder ().setColor ( "Blue" ).setDescription ( `Du hast dir die Rolle: <@&${ split [ 2 ]}> genommen` )
                ], ephemeral: true })
            } else {
                await interaction.member.roles.add ( split [ 2 ])
                await interaction.reply ({ embeds: [
                    new EmbedBuilder ().setColor ( "Blue" ).setDescription ( `Du hast dir die Rolle: <@&${ split [ 2 ]}> gegeben` )
                ], ephemeral: true })
            }
        }
        else if ( interaction.customId.startsWith ( "rules-" )) {
            const split = interaction.customId.split ( "-" )
            if ( interaction.member.roles.cache.has ( split [ 1 ])) {
                await interaction.reply ({ embeds: [
                    new EmbedBuilder ().setColor ( "Blue" ).setDescription ( `Du hast die Regeln bereits akzeptiert` )
                ], ephemeral: true })
            } else {
                await interaction.member.roles.add ( split [ 1 ])
                await interaction.reply ({ embeds: [
                    new EmbedBuilder ().setColor ( "Blue" ).setDescription ( `Du hast die Regeln akzeptiert` )
                ], ephemeral: true })
            }
        }
    }
})

//Logging
client.on ( "messageDelete", async ( message ) => {//beim löschen von einzelnen Nachrichten
    if ( !message.content || message.author.bot ) return
    const logChannel = await message.guild.channels.fetch ( "1232297054999548004" )
    await logChannel.send ({
        embeds: [
            new EmbedBuilder ()
            .setTitle ( "Message deleted" )
            .setColor ( "DarkRed" )
            .setDescription ( `Message by ${ message.author }|${ message.author.username } in the channel: ${ message.channel }\n${ message.content }` )
            .setFooter ({ text: `ID: ${ message.author.id }` })
        ]
    })
})

client.on ( "messageUpdate", async ( oldMessage, newMessage ) => {//beim editieren von Nachrichten
    if ( oldMessage.author.bot ) return
    const logChannel = await oldMessage.guild.channels.fetch ( "1232297054999548004" )
    await logChannel.send ({
        embeds: [
            new EmbedBuilder ()
            .setTitle ( "Message edited" )
            .setColor ( "Yellow" )
            .setDescription ( `Message by ${ oldMessage.author }|${ oldMessage.author.username } in the channel: ${ oldMessage.channel }` )
            .addFields ([
                { name: `Old Message`, value: `-> ${ oldMessage.content }`, inline: false },
                { name: `New Message`, value: `-> ${ newMessage.content }`, inline: false },
            ])
            .setFooter ({ text: `ID: ${ oldMessage.author.id }` })
        ]
    })
})

client.on ( "guildMemberAdd", async ( member ) => {//wenn ein member dem server beitritt && Wilkommensnachricht kommt hier
    if ( member.user.bot ) return
    const welcomeChannel = await member.guild.channels.fetch ( "1221406495300784178" )
    const logChannel = await member.guild.channels.fetch ( "1232382456171200562" )
    const welcomeEmbed = new EmbedBuilder ()
    .setTitle ( `${ member.guild.name }` )
    .setDescription ( `Willkommen ${ member } auf *__Ultimative E-Sports__*\nwir freuen uns, dass Du Dich für unseren Server entschieden hast und wünschen Dir viel Spaß!` )
    let createdAt = member.user.createdTimestamp
    createdAt = Math.floor ( createdAt / 1000 )
    const count = member.guild.members.cache.filter (( m ) => !m.user.bot ).size.toString ()
    let countString = count.endsWith ( "1" ) ? `${ count }st` : count.endsWith ( "2" ) ? `${ count }nd` : count.endsWith ( "3" ) ? `${ count }rd` : `${ count }th`
    const loggingEmbed = new EmbedBuilder ()
    .setTitle ( "Member Join" )
    .setColor ( "DarkGreen" )
    .setDescription ( `${ member } joined the Server ${ member.guild.name }` )
    .addFields ([
        { name: "Account Age:", value: `The Account was created <t:${ createdAt }:R>`, inline: true },
        { name: "Current Members:", value: `this is the ${ countString } Member`, inline: true }
    ])
    await welcomeChannel.send ({ embeds: [ welcomeEmbed ]})
    await logChannel.send ({ embeds: [ loggingEmbed ]})
})

client.on ( "guildMemberRemove", async ( member ) => {//wenn ein member den server verlässt && Abschiedsnachricht
    if ( member.user.bot ) return
    const goodbyeChannel = await member.guild.channels.fetch ( "1232702762563801088" )
    const logChannel = await member.guild.channels.fetch ( "1232382456171200562" )
    let createdAt = member.user.createdTimestamp
    createdAt = Math.floor ( createdAt / 1000 )
    let joinedAt = member.joinedTimestamp
    joinedAt = Math.floor ( joinedAt / 1000 )
    const count = ( member.guild.members.cache.filter (( member ) => !member.user.bot ).size + 1 ).toString ()
    let countString = count.endsWith ( "1" ) ? `${ count }st` : count.endsWith ( "2" ) ? `${ count }nd` : count.endsWith ( "3" ) ? `${ count }rd` : `${ count }th`
    const goodByeEmbed = new EmbedBuilder ()
    .setTitle ( `${ member.guild.name }` )
    .setDescription ( `Auf wiedersehen ${ member.user.displayName }, viel Erfolg auf deinem Weg` )
    const loggingEmbed = new EmbedBuilder ()
    .setTitle ( "Member Left" )
    .setColor ( "Red" )
    .setDescription ( `${ member } left the Server ${ member.guild.name }` )
    .addFields ([
        { name: "Account Age:", value: `The Account was created <t:${ createdAt }:R>`, inline: true },
        { name: "Account Joined:", value: `The Account joined <t:${ joinedAt }:R>`, inline: true },
        { name: "Current Members:", value: `this is the ${ countString } Member`, inline: true }
    ])
    await goodbyeChannel.send ({ embeds: [ goodByeEmbed ]})
    await logChannel.send ({ embeds: [ loggingEmbed ]})
})

client.on ( "guildBanAdd", async ( ban ) => {//wenn jemand gebannt wird
    const logChannel = await member.guild.channels.fetch ( "1232382456171200562" )
    const loggingEmbed = new EmbedBuilder ()
    .setTitle ( "Member Banned" )
    .setColor ( "DarkRed" )
    .setDescription ( `${ ban.user } was banned` )
    .addFields ([
        { name: "Reason:", value: `${ ban.reason ? ban.reason : 'no Reason was given' }`, inline: true }
    ])
    await logChannel.send ({ embeds: [ loggingEmbed ]})
})

client.on ( "guildMemberUpdate", async ( oldMember, newMember ) => {//wenn ein member sein profil ändert
    const logChannel = await oldMember.guild.channels.fetch ( "1232382456171200562" )
    const loggingEmbed = new EmbedBuilder ()
    .setColor ( "Yellow" )
    .setDescription ( `${ oldMember } updated their Profile` )
    if ( oldMember.user.username !== newMember.user.username ) {//username änderung
        loggingEmbed.addFields ([
            { name: "old Username", value: `\`${ oldMember.user.username }\``, inline: true },
            { name: "new Username", value: `\`${ newMember.user.username }\``, inline: true },
            { name: "\u200b", value: "\u200b", inline: true }
        ])
    }
    if ( oldMember.user.displayName !== newMember.user.displayName ) {//displayname änderung
        loggingEmbed.addFields ([
            { name: "old Displayname", value: `\`${ oldMember.user.displayName }\``, inline: true },
            { name: "new Displayname", value: `\`${ newMember.user.displayName }\``, inline: true },
            { name: "\u200b", value: "\u200b", inline: true }
        ])
    }
    if ( oldMember.nickname !== newMember.nickname ) {//nickname änderung
        loggingEmbed.addFields ([
            { name: "old Nickname", value: `\`${ oldMember.nickname }\``, inline: true },
            { name: "new Nickname", value: `\`${ newMember.nickname }\``, inline: true },
            { name: "\u200b", value: "\u200b", inline: true }
        ])
    }
    if ( oldMember.user.avatarURL () !== newMember.user.avatarURL () ) {//avatar änderung
        loggingEmbed.addFields ([
            { name: "old Avatar", value: `[click here to view the Avatar](${ oldMember.user.avatarURL () })`, inline: true },
            { name: "new Avatar", value: `[click here to view the Avatar](${ newMember.user.avatarURL () })`, inline: true },
            { name: "\u200b", value: "\u200b", inline: true }
        ])
    }
    if ( oldMember.user.bannerURL () !== newMember.user.bannerURL () ) {//banner änderung
        loggingEmbed.addFields ([
            { name: "old Banner", value: `[click here to view the Banner](${ oldMember.user.bannerURL () })`, inline: true },
            { name: "new Banner", value: `[click here to view the Banner](${ newMember.user.bannerURL () })`, inline: true },
            { name: "\u200b", value: "\u200b", inline: true }
        ])
    }
    if ( oldMember.roles !== newMember.roles ) {//rollen änderung
        if ( oldMember.roles.cache.size > newMember.roles.cache.size ) {
            const roleList = []
            oldMember.roles.cache.forEach (( r ) => {
                if ( !newMember.roles.cache.has ( r.id )) {
                    roleList.push ( `<@&${ r.id }>` )
                }
            })
            await wait ( 10 * oldMember.roles.cache.size )
            loggingEmbed.setDescription ( `${ oldMember } removed the following Roles` )
            loggingEmbed.setColor ( "Red" )
            loggingEmbed.addFields ([{ name: "Role", value: roleList.join ( ', ' )}])

        } else if ( newMember.roles.cache.size > oldMember.roles.cache.size ) {
            const roleList = []
            newMember.roles.cache.forEach (( r ) => {
                if ( !oldMember.roles.cache.has ( r.id )) {
                    roleList.push ( `<@&${ r.id }>`)
                }
            })
            await wait ( 10 * newMember.roles.cache.size )
            loggingEmbed.setDescription ( `${ oldMember } added the following Roles` )
            loggingEmbed.setColor ( "Green" )
            loggingEmbed.addFields ([{ name: "Role", value: roleList.join ( ', ' )}])
        }
    }
    await logChannel.send ({ embeds: [ loggingEmbed ]})
})

client.on ( "channelCreate", async ( channel ) => {//wenn ein channel erstellt wird
    const logChannel = await channel.guild.channels.fetch ( "1232776344044179536" )
    const loggingEmbed = new EmbedBuilder ()
    .setTitle ( "Channel Created" )
    .setColor ( "Green" )
    .setDescription ( "a new Channel was created" )
    .addFields ([
        { name: "Channel Name", value: channel.name, inline: true }
    ])
    if ( channel.type === ChannelType.GuildCategory ) {
        loggingEmbed.setDescription ( "a new Category was created" )
    }
    if ( channel.isTextBased ()) {
        loggingEmbed.addFields ([
            { name: "the Type of Channel", value: channel.type, inline: true },
            { name: "is nsfw switched on?", value: channel.nsfw, inline: true },
            { name: "the Category the Channel is in", value: channel.parent ? channel.parent.name : "unnested Channel", inline: true },
            { name: "the Topic of the Channel", value: channel.topic ? channel.topic : "there currently isn't a Channel Topic", inline: true },
        ])
    }
    if ( channel.isVoiceBased ()) {
        loggingEmbed.addFields ([
            { name: "the Type of Channel", value: channel.type, inline: true },
            { name: "the Bitrate for the Channel", value: channel.bitrate, inline: true },
            { name: "the Category the Channel is in", value: channel.parent ? channel.parent.name : "unnested Channel", inline: true },
            { name: "the current Userlimit for this Channel", value: channel.userLimit, inline: true },
        ])
    }
    await logChannel.send ({ embeds: [ loggingEmbed ]})
})

client.on ( "channelDelete", async ( channel ) => {//wenn ein channel gelöscht wird
    const logChannel = await channel.guild.channels.fetch ( "1232776344044179536" )
    const loggingEmbed = new EmbedBuilder ()
    .setTitle ( "Channel Deleted" )
    .setColor ( "Red" )
    .setDescription ( `The channel ${ channel.name } was created` )
    await logChannel.send ({ embeds: [ loggingEmbed ]})
})

// client.on ( "channelUpdate", async ( oldChannel, newChannel ) => {//wenn ein channel editiert wird
//     console.log ( "channelUpdate" )
//     const oldTopic = oldChannel.topic === null ? "" : oldChannel.topic
//     // const logChannel = await oldChannel.guild.channels.fetch ( "1232776344044179536" )
//     const logChannel = await oldChannel.guild.channels.fetch ( "1138454567525302362" )
//     const loggingEmbed = new EmbedBuilder ()
//     .setColor ( "Yellow" )
//     if ( oldChannel.type === ChannelType.GuildCategory ) {
//         if ( oldChannel.name !== newChannel.name ) {//category wird neu benannt
//             loggingEmbed.setTitle ( "This Category was edited" )
//             loggingEmbed.addFields ([
//                 { name: "old Category Name", value: oldChannel.name, inline: true },
//                 { name: "new Category Name", value: newChannel.name, inline: true },
//             ])
//             await logChannel.send ({ embeds: [ loggingEmbed ]})
//         }
//     }
//     else if ( oldChannel.isTextBased ()) {
//         loggingEmbed.setTitle ( "The Channel was edited" )
//         if ( oldChannel.name !== newChannel.name ) {//textchannel bekommt neuen name
//             loggingEmbed.addFields ([
//                 { name: "Old Name:", value: oldChannel.name, inline: true },
//                 { name: "New Name:", value: newChannel.name, inline: true },
//                 { name: "\u200b", value: `\u200b`, inline: true },
//             ])
//         }
//         if ( oldChannel.nsfw !== newChannel.nsfw ) {//textchannel ändert den nsfw status
//             loggingEmbed.addFields ([
//                 { name: "Was NSFW turned on in this Channel", value: oldChannel.nsfw, inline: true },
//                 { name: "Is NSFW now turned on in this Channel", value: newChannel.nsfw, inline: true },
//                 { name: "\u200b", value: `\u200b`, inline: true },
//             ])
//         }
//         if ( oldChannel.parent !== newChannel.parent ) {//textchannel wird in eine andere category verschoben
//             loggingEmbed.addFields ([
//                 { name: "the Old Category", value: oldChannel.parent ? oldChannel.parent : "the Channel was uncategorized", inline: true },
//                 { name: "the New Category", value: newChannel.parent ? newChannel.parent : "the Channel now is uncategorized", inline: true },
//                 { name: "\u200b", value: `\u200b`, inline: true },
//             ])
//         }
//         if ( oldChannel.topic !== newChannel.topic ) {//textchannel bekommt eine neue beschreibung
//             console.log ( newChannel.topic )
//             console.log ( oldChannel.topic )
//             loggingEmbed.addFields ([
//                 { name: "The previous Topic", value: oldChannel.topic ? oldChannel.topic : "there was no Topic", inline: true },
//                 { name: "The new Topic", value:newChannel.topic ? newChannel.topic : "there now is no Topic", inline: true },
//                 { name: "\u200b", value: `\u200b`, inline: true },
//             ])
//         }
//         if ( loggingEmbed.data.fields && loggingEmbed.data.fields.length !== 0 ) {
//             await logChannel.send ({ embeds: [ loggingEmbed ]})
//         } else return
//     }
//     else if ( oldChannel.isVoiceBased ()) {
//         loggingEmbed.setTitle ( "The Channel was edited" )
//         if ( oldChannel.name !== newChannel.name ) {//voicechannel bekommt einen neuen namen
//             loggingEmbed.addFields ([
//                 { name: "The old Name", value: oldChannel.name, inline: true },
//                 { name: "The new Name", value: newChannel.name, inline: true },
//                 { name: "\u200b", value: `\u200b`, inline: true },
//             ])
//         }
//         if ( oldChannel.bitrate !== newChannel.bitrate ) {//voicechannel ändert die bitrate
//             loggingEmbed.addFields ([
//                 { name: "The previous Bitrate", value: oldChannel.bitrate, inline: true },
//                 { name: "The new Bitrate", value: newChannel.bitrate, inline: true },
//                 { name: "\u200b", value: `\u200b`, inline: true },
//             ])
//         }
//         if ( oldChannel.parent !== newChannel.parent ) {//voicechannel wird in eine andere category verschoben
//             loggingEmbed.addFields ([
//                 { name: "The previous Category", value: oldChannel.parent ? oldChannel.parent : "the Channel was uncategorized", inline: true },
//                 { name: "The new Category", value:newChannel.parent ?newChannel.parent : "the Channel now is uncategorized", inline: true },
//                 { name: "\u200b", value: `\u200b`, inline: true },
//             ])
//         }
//         if ( oldChannel.userLimit !== newChannel.userLimit ) {//voicechannel bekommt ein neues Userlimit
//             loggingEmbed.addFields ([
//                 { name: "The previous Userlimit", value: oldChannel.userLimit ? oldChannel.userLimit : "the Channel had no Userlimit", inline: true },
//                 { name: "The new Userlimit", value: newChannel.userLimit ? newChannel.userLimit : "the Channel now has no Userlimit", inline: true },
//                 { name: "\u200b", value: `\u200b`, inline: true },
//             ])
//         }
//         if ( loggingEmbed.data.fields && loggingEmbed.data.fields.length !== 0 ) {
//             await logChannel.send ({ embeds: [ loggingEmbed ]})
//         } else return
//     }
//     else return
//     // await logChannel.send ({ embeds: [ loggingEmbed ]})
// })

client.on ( "guildUpdate", async ( oldGuild, newGuild ) => {//wenn der server editiert wird
    const logChannel = await oldGuild.channels.fetch ( "1232776344044179536" )
    const loggingEmbed = new EmbedBuilder ()
    .setColor ( "Yellow" )
    .setTitle ( "The Server was updated" )
    if ( oldGuild.name !== newGuild.name ) {//servername ändert sich
        loggingEmbed.addFields ([
            { name: "The previous Name", value: oldGuild.name, inline: true },
            { name: "The new Name", value: newGuild.name, inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
        ])
    }
    if ( oldGuild.bannerURL () !== newGuild.bannerURL ()) {//serverbanner ändert sich
        loggingEmbed.addFields ([
            { name: "The old Banner", value: `[Click here to view the old Banner](${ oldGuild.bannerURL ()})`, inline: true },
            { name: "The new Banner", value: `[Click here to view the new Banner](${ newGuild.bannerURL ()})`, inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
        ])
    }
    if ( oldGuild.description !== newGuild.description ) {//serverbeschreibung ändert sich
        loggingEmbed.addFields ([
            { name: "The old Description", value: oldGuild.description ? oldGuild.description : 'There was no Description', inline: true },
            { name: "The new Description", value: newGuild.description ? newGuild.description : 'There now is no Description', inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
        ])
    }
    if ( oldGuild.iconURL () !== newGuild.iconURL ()) {//servericon ändert sich
        loggingEmbed.addFields ([
            { name: "The old Icon", value: `[Click here to view the old Icon](${ oldGuild.iconURL ()})`, inline: true },
            { name: "The new Icon", value: `[Click here to view the new Icon](${ newGuild.iconURL ()})`, inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
        ])
    }
    if ( oldGuild.ownerId !== newGuild.ownerId ) {//serverowner ändert sich
        loggingEmbed.addFields ([
            { name: "The previous Owner", value: `<@${ oldGuild.ownerId }> | ${ oldGuild.ownerId }`, inline: true },
            { name: "The new Owner", value: `<@${ newGuild.ownerId }> | ${ newGuild.ownerId }`, inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
        ])
    }
    if ( loggingEmbed.data.fields && loggingEmbed.data.fields.length !== 0 ) {
        await logChannel.send ({ embeds: [ loggingEmbed ]})
    } else return
})

client.on ( "voiceStateUpdate", async ( oldState, newState ) => {//wenn Member einem voicechannel joinen oder ihn verlassen
    const logChannel = await oldState.guild.channels.fetch ( "1233003101007380561" )
    if ( !oldState.channel ) {//wenn ein Member einen voicechannel joined
        const loggingEmbed = new EmbedBuilder ()
        .setColor ( "Green" )
        .setTitle ( "Member Joined a Voice Channel" )
        .setDescription ( `${ newState.member } joined the Voice Channel: ${ newState.channel }` )
        await logChannel.send ({ embeds: [ loggingEmbed ]})
    }
    else if ( !newState.channel ) {//wenn ein Member einen voicehcannel verlässt
        const loggingEmbed = new EmbedBuilder ()
        .setColor ( "Red" )
        .setTitle ( "Member Left a Voice Channel" )
        .setDescription ( `${ oldState.member } left the Voice Channel: ${ oldState.channel }` )
        await logChannel.send ({ embeds: [ loggingEmbed ]})
    }
    else if ( oldState.channel !== newState.channel ) {//wenn ein Member von einem voicechannel in einen anderen voicechannel wechselt
        const loggingEmbed = new EmbedBuilder ()
        .setColor ( "Yellow" )
        .setTitle ( "Member Moved to a different Voice Channel" )
        .setDescription ( `${ oldState.member } switched Voice Channels` )
        .addFields ([
            { name: "previous Channel", value: oldState.channel.name, inline: true },
            { name: "new Channel", value: newState.channel.name, inline: true },
        ])
        await logChannel.send ({ embeds: [ loggingEmbed ]})
    }
    else return
})

//Interaction Commands
client.on ( "interactionCreate", async ( interaction ) => {
    if ( interaction.isCommand ()) {
        switch ( interaction.commandName ) {
            case "embed":
                await embedCMD ( interaction )
                break;
        }
    }
})

/**
 * Embed Command
 * @param { CommandInteraction } interaction - The Interaction to reply to
 */
async function embedCMD ( interaction ) {
    const option = await interaction.options.getString ( "embed" )
    const selection = embeds.filter ( element => {
        if ( element.name === option ) return true
        else return false
    })[ 0 ]
    const embed = selection.embed
    const components = selection.actionRaw || []
    if ( selection.raw === 1 ) {
        const actionRaw = new ActionRowBuilder ().addComponents ( components )
        await interaction.channel.send ({ embeds: [ embed ], components: [ actionRaw ]})
        await interaction.reply ({ content: "embed send", ephemeral: true })
    } else if ( selection.raw === 2 ) {
        const comp_1 = components.splice ( 0, selection.size [ 1 ])
        const comp_2 = components
        const actionRaw = [
            new ActionRowBuilder ().addComponents ( comp_1 ),
            new ActionRowBuilder ().addComponents ( comp_2 ),
        ]
        await interaction.channel.send ({ embeds: [ embed ], components: actionRaw })
        await interaction.reply ({ content: "embed send", ephemeral: true })
    } else if ( selection.raw === 3 ) {
        const comp_1 = components.splice ( 0, selection.size [ 1 ])
        const comp_2 = components.splice ( 0, selection.size [ 2 ])
        const comp_3 = components
        const actionRaw = [
            new ActionRowBuilder ().addComponents ( comp_1 ),
            new ActionRowBuilder ().addComponents ( comp_2 ),
            new ActionRowBuilder ().addComponents ( comp_3 ),
        ]
        await interaction.channel.send ({ embeds: [ embed ], components: actionRaw })
        await interaction.reply ({ content: "embed send", ephemeral: true })
    } else if ( selection.raw === 4 ) {
        const comp_1 = components.splice ( 0, selection.size [ 1 ])
        const comp_2 = components.splice ( 0, selection.size [ 2 ])
        const comp_3 = components.splice ( 0, selection.size [ 3 ])
        const comp_4 = components
        const actionRaw = [
            new ActionRowBuilder ().addComponents ( comp_1 ),
            new ActionRowBuilder ().addComponents ( comp_2 ),
            new ActionRowBuilder ().addComponents ( comp_3 ),
            new ActionRowBuilder ().addComponents ( comp_4 ),
        ]
        await interaction.channel.send ({ embeds: [ embed ], components: actionRaw })
        await interaction.reply ({ content: "embed send", ephemeral: true })
    } else if ( selection.raw === 5 ) {
        const comp_1 = components.splice ( 0, selection.size [ 1 ])
        const comp_2 = components.splice ( 0, selection.size [ 2 ])
        const comp_3 = components.splice ( 0, selection.size [ 3 ])
        const comp_4 = components.splice ( 0, selection.size [ 4 ])
        const comp_5 = components
        const actionRaw = [
            new ActionRowBuilder ().addComponents ( comp_1 ),
            new ActionRowBuilder ().addComponents ( comp_2 ),
            new ActionRowBuilder ().addComponents ( comp_3 ),
            new ActionRowBuilder ().addComponents ( comp_4 ),
            new ActionRowBuilder ().addComponents ( comp_5 ),
        ]
        await interaction.channel.send ({ embeds: [ embed ], components: actionRaw })
        await interaction.reply ({ content: "embed send", ephemeral: true })
    }
    else {
        await interaction.channel.send ({ embeds: [ embed ]})
        await interaction.reply ({ content: "embed send", ephemeral: true })
    }
}
