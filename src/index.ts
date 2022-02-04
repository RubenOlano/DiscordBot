import 'dotenv/config'
import { Client, Intents } from 'discord.js'
const { TOKEN } = process.env

const client = new Client({ intents: [Intents.FLAGS.GUILDS]})

client.once('ready', () => {
    console.log('ready')
})

client.login(TOKEN)