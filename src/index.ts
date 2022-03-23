import "dotenv/config";

import { Client, ClientOptions, Intents } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

import { createInteraction } from "./listeners/interactionCreate";
import { ready } from "./listeners/ready";

const clientOptions: ClientOptions = {
    intents: [Intents.FLAGS.GUILDS],
    presence: {
        status: "dnd",
        activities: [{ name: "with code", type: ActivityTypes.PLAYING }],
    },
};

const client = new Client(clientOptions);

ready(client);
createInteraction(client);

client.login(process.env.TOKEN);
