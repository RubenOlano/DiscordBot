"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const dotenv_1 = require("dotenv");
const Client_1 = require("./structures/Client");
(0, dotenv_1.config)();
const token = process.env.TOKEN;
const client = new Client_1.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_EMOJIS_AND_STICKERS"] }, token);
client.start();
//TODO: connect to twitter api to acess trending
//# sourceMappingURL=index.js.map