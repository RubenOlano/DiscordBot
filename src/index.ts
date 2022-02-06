import { config } from "dotenv";
import { Client } from "./structures/Client";
import fs from "fs";
import { Intents } from "discord.js";

config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const eventFiles = fs
  .readdirSync(`${__dirname}/structures/events`)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`${__dirname}/structures/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.start();
