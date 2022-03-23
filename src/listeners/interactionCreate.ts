import { BaseCommandInteraction, Client, Interaction } from "discord.js";

import { Commands } from "../Commands";

export const createInteraction = (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenu())
            await handleSlashCommand(client, interaction);
    });
};

const handleSlashCommand = async (
    client: Client,
    interaction: BaseCommandInteraction
): Promise<void> => {
    const command = Commands.find(
        (comm) => comm.name === interaction.commandName
    );

    if (!command || !command.run) {
        interaction.followUp({ content: "No such command found" });

        return;
    }

    await interaction.deferReply();
    command.run(client, interaction);
};
