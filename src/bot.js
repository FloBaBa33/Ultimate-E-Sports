require ( "dotenv" ).config ()
const { Client, IntentsBitField, EmbedBuilder, ChannelType } = require ( "discord.js" )

const client = new Client ({
    intents: [
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates
    ]
})

//Helper Functions

/**
 * 
 * @param { number } ms - the time to stop for (in milisec.)
 * @returns { * } -nothing
 */
async function wait ( ms ) { return new Promise ( res => setTimeout ( res, ms )) }


client.login ( process.env.TOKEN )

client.on ( "ready", async ( bot ) => {
    console.log ( "ready" )
    console.log ( bot.user.username )
    //TODO: create Commands
})

client.on ( "messageDelete", async ( message ) => {
    if ( !message.content || message.author.bot ) return
    const logChannel = await message.guild.channels.fetch ( "1232297054999548004" )
    await logChannel.send ({
        embeds: [
            new EmbedBuilder ()
            .setTitle ( "Message deleted" )
            .setColor ( "DarkRed" )
            .setDescription ( `Message by ${ message.author }|${ message.author.username }\n${ message.content }`)
            .setFooter ({ text: `ID: ${ message.author.id }` })
        ]
    })
})

client.on ( "messageUpdate", async ( oldMessage, newMessage ) => {
    if ( oldMessage.author.bot ) return
    const logChannel = await oldMessage.guild.channels.fetch ( "1232297054999548004" )
    await logChannel.send ({
        embeds: [
            new EmbedBuilder ()
            .setTitle ( "Message edited" )
            .setColor ( "Yellow" )
            .setDescription ( `Message by ${ oldMessage.author }|${ oldMessage.author.username }`)
            .addFields ([
                { name: `Old Message`, value: `-> ${ oldMessage.content }`, inline: false },
                { name: `New Message`, value: `-> ${ newMessage.content }`, inline: false },
            ])
            .setFooter ({ text: `ID: ${ oldMessage.author.id }` })
        ]
    })
})

client.on ( "guildMemberAdd", async ( member ) => {
    if ( member.user.bot ) return
    const welcomeChannel = await member.guild.channels.fetch ( "1221406495300784178" )
    const logChannel = await member.guild.channels.fetch ( "1232382456171200562" )
    const welcomeEmbed = new EmbedBuilder ()
    .setTitle ( `${ member.guild.name }` )
    .setDescription ( `Willkommen ${ member }\nVielen Dank, dass du dich für uns entschieden hast` )
    let createdAt = member.user.createdTimestamp ()
    createdAt = Math.floor ( createdAt / 1000 )
    const count = member.guild.members.cache.filter (( member ) => !member.user.bot ).size.toString ()
    let countString = count.endsWith ( "1" ) ? `${ count }st` : count.endsWith ( "2" ) ? `${ count }nd` : count.endsWith ( "3" ) ? `${ count }rd` : `${ count }th`
    const loggingEmbed = new EmbedBuilder ()
    .setTitle ( "Member Join" )
    .setColor ( "DarkGreen" )
    .setDescription ( `${ member } joined the Server ${ member.guild.name }` )
    .addFields ([
        { name: "Account Age:", value: `The Account was created <:${ createdAt }:R>`, inline: true },
        { name: "Current Members:", value: `this is the ${ countString } Member`, inline: true }
    ])
    await welcomeChannel.send ({ embeds: [ welcomeEmbed ]})
    await logChannel.send ({ embeds: [ loggingEmbed ]})
})

client.on ( "guildMemberRemove", async ( member ) => {
    if ( member.user.bot ) return
    const logChannel = await member.guild.channels.fetch ( "1232382456171200562" )
    let createdAt = member.user.createdTimestamp ()
    createdAt = Math.floor ( createdAt / 1000 )
    let joinedAt = member.joinedTimestamp ()
    joinedAt = Math.floor ( joinedAt / 1000 )
    const count = ( member.guild.members.cache.filter (( member ) => !member.user.bot ).size + 1 ).toString ()
    let countString = count.endsWith ( "1" ) ? `${ count }st` : count.endsWith ( "2" ) ? `${ count }nd` : count.endsWith ( "3" ) ? `${ count }rd` : `${ count }th`
    const loggingEmbed = new EmbedBuilder ()
    .setTitle ( "Member Left" )
    .setColor ( "Red" )
    .setDescription ( `${ member } left the Server ${ member.guild.name }` )
    .addFields ([
        { name: "Account Age:", value: `The Account was created <:${ createdAt }:R>`, inline: true },
        { name: "Account Joined:", value: `The Account joined <:${ joinedAt }:R>`, inline: true },
        { name: "Current Members:", value: `this is the ${ countString } Member`, inline: true }
    ])
    await logChannel.send ({ embeds: [ loggingEmbed ]})
})

client.on ( "guildBanAdd", async ( ban ) => {
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

client.on ( "guildMemberUpdate", async ( oldMember, newMember ) => {
    const logChannel = await member.guild.channels.fetch ( "1232382456171200562" )
    const loggingEmbed = new EmbedBuilder ()
    .setColor ( "Yellow" )
    .setDescription ( `${ oldMember } updated their Profile` )
    if ( oldMember.user.username !== newMember.user.username ) {
        loggingEmbed.addFields ([
            { name: "old Username", value: `\`${ oldMember.user.username }\``, inline: true },
            { name: "new Username", value: `\`${ newMember.user.username }\``, inline: true },
            { name: "\u200b", value: "\u200b", inline: true }
        ])
    }
    if ( oldMember.user.displayName !== newMember.user.displayName ) {
        loggingEmbed.addFields ([
            { name: "old Displayname", value: `\`${ oldMember.user.displayName }\``, inline: true },
            { name: "new Displayname", value: `\`${ newMember.user.displayName }\``, inline: true },
            { name: "\u200b", value: "\u200b", inline: true }
        ])
    }
    if ( oldMember.nickname !== newMember.nickname ) {
        loggingEmbed.addFields ([
            { name: "old Nickname", value: `\`${ oldMember.nickname }\``, inline: true },
            { name: "new Nickname", value: `\`${ newMember.nickname }\``, inline: true },
            { name: "\u200b", value: "\u200b", inline: true }
        ])
    }
    if ( oldMember.user.avatarURL () !== newMember.user.avatarURL () ) {
        loggingEmbed.addFields ([
            { name: "old Avatar", value: `[click here to view the Avatar](${ oldMember.user.avatarURL () })`, inline: true },
            { name: "new Avatar", value: `[click here to view the Avatar](${ newMember.user.avatarURL () })`, inline: true },
            { name: "\u200b", value: "\u200b", inline: true }
        ])
    }
    if ( oldMember.user.bannerURL () !== newMember.user.bannerURL () ) {
        loggingEmbed.addFields ([
            { name: "old Banner", value: `[click here to view the Banner](${ oldMember.user.bannerURL () })`, inline: true },
            { name: "new Banner", value: `[click here to view the Banner](${ newMember.user.bannerURL () })`, inline: true },
            { name: "\u200b", value: "\u200b", inline: true }
        ])
    }
    if ( oldMember.roles !== newMember.roles ) {
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

client.on ( "channelCreate", async ( channel ) => {
    const logChannel = await member.guild.channels.fetch ( "1232776344044179536" )
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

client.on ( "channelDelete", async ( channel ) => {
    const logChannel = await member.guild.channels.fetch ( "1232776344044179536" )
    const loggingEmbed = new EmbedBuilder ()
    .setTitle ( "Channel Deleted" )
    .setColor ( "Red" )
    .setDescription ( `The channel ${ channel.name } was created` )
    await logChannel.send ({ embeds: [ loggingEmbed ]})
})

client.on ( "channelUpdate", async ( oldChannel, newChannel ) => {
    const logChannel = await member.guild.channels.fetch ( "1232776344044179536" )
    .setColor ( "Yellow" )
    if ( oldChannel.type === ChannelType.GuildCategory ) {
        if ( oldChannel.name !== newChannel.name ) {
            loggingEmbed.setTitle ( "This Category was edited" )
            loggingEmbed.addFields ([
                { name: "old Category Name", value: oldChannel.name, inline: true },
                { name: "new Category Name", value: newChannel.name, inline: true },
            ])
        }
    }
    else if ( oldChannel.isTextBased ()) {
        loggingEmbed.setTitle ( "The Channel was edited" )
        if ( oldChannel.name !== newChannel.name ) {
            loggingEmbed.addFields ([
                { name: "Old Name:", value: oldChannel.name, inline: true },
                { name: "New Name:", value: newChannel.name, inline: true },
                { name: "\u200b", value: `\u200b`, inline: true },
            ])
        }
        if ( oldChannel.nsfw !== newChannel.nsfw ) {
            loggingEmbed.addFields ([
                { name: "Was NSFW turned on in this Channel", value: oldChannel.nsfw, inline: true },
                { name: "Is NSFW now turned on in this Channel", value: newChannel.nsfw, inline: true },
                { name: "\u200b", value: `\u200b`, inline: true },
            ])
        }
        if ( oldChannel.parent !== newChannel.parent ) {
            loggingEmbed.addFields ([
                { name: "the Old Category", value: oldChannel.parent ? oldChannel.parent : "the Channel was uncategorized", inline: true },
                { name: "the New Category", value: newChannel.parent ? newChannel.parent : "the Channel now is uncategorized", inline: true },
                { name: "\u200b", value: `\u200b`, inline: true },
            ])
        }
        if ( oldChannel.topic !== newChannel.topic ) {
            loggingEmbed.addFields ([
                { name: "The previous Topic", value: oldChannel.topic ? oldChannel.topic : "there was no Topic", inline: true },
                { name: "The new Topic", value:newChannel.topic ?newChannel.topic : "there now is no Topic", inline: true },
                { name: "\u200b", value: `\u200b`, inline: true },
            ])
        }
        if ( loggingEmbed.data.fields.length !== 0 ) {
            await logChannel.send ({ embeds: [ loggingEmbed ]})
        } else return
    }
    else if ( oldChannel.isVoiceBased ()) {
        loggingEmbed.setTitle ( "The Channel was edited" )
        if ( oldChannel.name !== newChannel.name ) {
            loggingEmbed.addFields ([
                { name: "The old Name", value: oldChannel.name, inline: true },
                { name: "The new Name", value: newChannel.name, inline: true },
                { name: "\u200b", value: `\u200b`, inline: true },
            ])
        }
        if ( oldChannel.bitrate !== newChannel.bitrate ) {
            loggingEmbed.addFields ([
                { name: "The previous Bitrate", value: oldChannel.bitrate, inline: true },
                { name: "The new Bitrate", value: newChannel.bitrate, inline: true },
                { name: "\u200b", value: `\u200b`, inline: true },
            ])
        }
        if ( oldChannel.parent !== newChannel.parent ) {
            loggingEmbed.addFields ([
                { name: "The previous Category", value: oldChannel.parent ? oldChannel.parent : "the Channel was uncategorized", inline: true },
                { name: "The new Category", value:newChannel.parent ?newChannel.parent : "the Channel now is uncategorized", inline: true },
                { name: "\u200b", value: `\u200b`, inline: true },
            ])
        }
        if ( oldChannel.userLimit !== newChannel.userLimit ) {
            loggingEmbed.addFields ([
                { name: "The previous Userlimit", value: oldChannel.userLimit ? oldChannel.userLimit : "the Channel had no Userlimit", inline: true },
                { name: "The new Userlimit", value: newChannel.userLimit ? newChannel.userLimit : "the Channel now has no Userlimit", inline: true },
                { name: "\u200b", value: `\u200b`, inline: true },
            ])
        }
        if ( loggingEmbed.data.fields.length !== 0 ) {
            await logChannel.send ({ embeds: [ loggingEmbed ]})
        } else return
    }
    else return
    await logChannel.send ({ embeds: [ loggingEmbed ]})
})

client.on ( "guildUpdate", async ( oldGuild, newGuild ) => {
    const logChannel = await member.guild.channels.fetch ( "1232776344044179536" )
    const loggingEmbed = new EmbedBuilder ()
    .setColor ( "Yellow" )
    .setTitle ( "The Server was updated" )
    if ( oldGuild.name !== newGuild.name ) {
        loggingEmbed.addFields ([
            { name: "The previous Name", value: oldGuild.name, inline: true },
            { name: "The new Name", value: newGuild.name, inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
        ])
    }
    if ( oldGuild.bannerURL () !== newGuild.bannerURL ()) {
        loggingEmbed.addFields ([
            { name: "The old Banner", value: `[Click here to view the old Banner](${ oldGuild.bannerURL ()})`, inline: true },
            { name: "The new Banner", value: `[Click here to view the new Banner](${ newGuild.bannerURL ()})`, inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
        ])
    }
    if ( oldGuild.description !== newGuild.description ) {
        loggingEmbed.addFields ([
            { name: "The old Description", value: oldGuild.description ? oldGuild.description : 'There was no Description', inline: true },
            { name: "The new Description", value: newGuild.description ? newGuild.description : 'There now is no Description', inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
        ])
    }
    if ( oldGuild.iconURL () !== newGuild.iconURL ()) {
        loggingEmbed.addFields ([
            { name: "The old Icon", value: `[Click here to view the old Icon](${ oldGuild.iconURL ()})`, inline: true },
            { name: "The new Icon", value: `[Click here to view the new Icon](${ newGuild.iconURL ()})`, inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
        ])
    }
    if ( oldGuild.ownerId !== newGuild.ownerId ) {
        loggingEmbed.addFields ([
            { name: "The previous Owner", value: `<@${ oldGuild.ownerId }> | ${ oldGuild.ownerId }`, inline: true },
            { name: "The new Owner", value: `<@${ newGuild.ownerId }> | ${ newGuild.ownerId }`, inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
        ])
    }
    if ( loggingEmbed.data.fields.length !== 0 ) {
        await logChannel.send ({ embeds: [ loggingEmbed ]})
    } else return
})

client.on ( "voiceStateUpdate", async ( oldState, newState ) => {
    const logChannel = await member.guild.channels.fetch ( "1233003101007380561" )
    if ( !oldState.channel ) {
        const loggingEmbed = new EmbedBuilder ()
        .setColor ( "Green" )
        .setTitle ( "Member Joined a Voice Channel" )
        .setDescription ( `${ newState.member } joined the Voice Channel: ${ newState.channel }` )
        await logChannel.send ({ embeds: [ loggingEmbed ]})
    }
    else if ( !newState.channel ) {
        const loggingEmbed = new EmbedBuilder ()
        .setColor ( "Red" )
        .setTitle ( "Member Left a Voice Channel" )
        .setDescription ( `${ oldState.member } left the Voice Channel: ${ oldState.channel }` )
        await logChannel.send ({ embeds: [ loggingEmbed ]})
    }
    else if ( oldState.channel !== newState.channel ) {
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

//TODO: reaction Roles
//TODO: Suggestions
//TODO: Embed Builder
