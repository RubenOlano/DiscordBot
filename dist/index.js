"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const { TOKEN } = process.env;
const client = new discord_js_1.Client({ intents: ['GUILDS', 'GUILD_VOICE_STATES', 'GUILD_MEMBERS', 'GUILD_MESSAGES'] });
client.once('ready', () => {
    var _a;
    console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
});
client.on('messageCreate', async (message) => {
    if (message.author.bot)
        return;
    console.log(message);
    await message.channel.send('hi');
});
client.login(TOKEN);
//# sourceMappingURL=index.js.map