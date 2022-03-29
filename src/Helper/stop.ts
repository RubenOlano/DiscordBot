import { BaseCommandInteraction, Client } from "discord.js";
import { commandFunction } from "src/types/commandFunction";

import { queue } from "../Structs/queue";

export const stop: commandFunction = (
    _client: Client,
    interaction: BaseCommandInteraction
) => {
    const {
        guild,
        user: { id },
    } = interaction;
    const member = guild!.members.cache.get(id);
    const vc = member?.voice?.channel;
    const serverQueue = queue.get(guild!.id);

    if (!vc) {
        return interaction.followUp({
            content: "Must be in a voice channel to use this command",
        });
    }

    if (!serverQueue) {
        return interaction.followUp({
            content: "No songs to stop",
        });
    }

    serverQueue.songs = [];
    serverQueue.connection?.destroy();

    return interaction.followUp({ content: "The queue has been cleared" });
};
