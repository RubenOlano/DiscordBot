import 'dotenv/config'
import { Client } from 'discord.js'
const { TOKEN } = process.env

const client = new Client({intents: ['GUILDS', 'GUILD_VOICE_STATES', 'GUILD_MEMBERS', 'GUILD_MESSAGES']})

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`)
})

client.on('messageCreate', async (message) => {
    if (message.author.bot)
        return;
    console.log(message)
    await message.channel.send('hi')
})

client.login(TOKEN)