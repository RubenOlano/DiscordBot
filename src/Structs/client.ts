import { Client, ClientOptions, Intents } from "discord.js";

const clientOptions: ClientOptions = {
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    presence: {
        status: "dnd",
        activities: [{ name: "with code", type: "PLAYING" }],
    },
};

export const client = new Client(clientOptions);
