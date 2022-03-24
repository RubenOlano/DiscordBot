import { Client } from "discord.js";

export const onMessage = (client: Client) => {
    client.on("messageCreate", (message) => {
        if (message.type == "APPLICATION_COMMAND") return;

        console.log(message.content);
    });
};
