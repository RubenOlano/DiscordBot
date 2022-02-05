/** @format */
import { config } from "dotenv";
import { Client } from "./structures/Client";

config();

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_EMOJIS_AND_STICKERS"],
});

client.start();
//TODO: connect to twitter api to acess trending
