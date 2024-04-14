require ( "dotenv" ).config ()
const { Client, IntentsBitField, EmbedBuilder } = require ( "discord.js" )

const client = new Client ({
    intents: [
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.Guilds
    ]
})

client.login ( process.env.TOKEN )

client.on ( "ready", async ( bot ) => {
    console.log ( "ready" )
    console.log ( bot.user.username )
})

client.on ( "guildMemberAdd", async ( member ) => {
    if ( member.user.bot ) return
    const welcomeChannel = await member.guild.channels.fetch ( "1221406495300784178" )
    const welcomeEmbed = new EmbedBuilder ()
    .setTitle ( `${ member.guild.name }` )
    .setDescription ( `Willkommen ${ member }\nVielen Dank, dass du dich für uns entschieden hast` )
    await welcomeChannel.send ({ embeds: [ welcomeEmbed ]})
})
