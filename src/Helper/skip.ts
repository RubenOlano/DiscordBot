import { BaseCommandInteraction, Client } from "discord.js";

import { queue } from "../Structs/queue";

export const skip = (_client: Client, interaction: BaseCommandInteraction) => {
    const { guild } = interaction!;
    const member = guild!.members.cache.get(interaction.user.id);
    const vc = member?.voice?.channel;
    const serverQueue = queue.get(guild!.id);

    if (!vc) {
        interaction.followUp({
            content: "Must be in a voice channel to use this command",
        });

        return;
    }

    if (!serverQueue) {
        interaction.followUp({
            content: "No songs left to skip!",
        });

        return;
    }

    return serverQueue.connection!.destroy();
};
