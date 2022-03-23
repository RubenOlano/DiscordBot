import "dotenv/config";

import { Client, Intents } from "discord.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
    console.log(`${client.user?.tag} is ready!`);
});

client.login(process.env.TOKEN);
