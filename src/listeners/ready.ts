import { Client } from "discord.js";

import { Commands } from "../Commands";

export const ready = (client: Client): void => {
    client.once("ready", async () => {
        await client.application?.commands.set(Commands);
        console.log(`${client.user?.tag} is ready!`);
    });
};
