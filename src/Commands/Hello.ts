import { BaseCommandInteraction, Client } from "discord.js";

import { Command } from "../Command";

export const Hello: Command = {
    name: "hello",
    description: "Returns a greeting",
    type: "CHAT_INPUT",
    run: async (_client: Client, interaction: BaseCommandInteraction) => {
        return await interaction.followUp({
            ephemeral: true,
            content: `Hello ${interaction.user}`,
        });
    },
};
