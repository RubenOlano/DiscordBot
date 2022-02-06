"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const Client_1 = require("./structures/Client");
const fs_1 = __importDefault(require("fs"));
const discord_js_1 = require("discord.js");
(0, dotenv_1.config)();
const client = new Client_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
const eventFiles = fs_1.default
    .readdirSync(`${__dirname}/structures/events`)
    .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`${__dirname}/structures/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
client.start();
//# sourceMappingURL=index.js.map