import "dotenv/config";

import { Client, ClientOptions, Intents } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

import { createInteraction } from "./listeners/interactionCreate";
import { onMessage } from "./listeners/onMessage";
import { ready } from "./listeners/ready";

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
        activities: [{ name: "with code", type: ActivityTypes.PLAYING }],
    },
};

const client = new Client(clientOptions);

ready(client);
createInteraction(client);
onMessage(client);

client.login(process.env.TOKEN);
