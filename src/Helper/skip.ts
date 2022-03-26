import { BaseCommandInteraction, Client } from "discord.js";

import { queue } from "../Structs/queue";
import { play } from "./play";

export const skip = async (
    _client: Client,
    interaction: BaseCommandInteraction
) => {
    const {
        guild,
        user: { id },
    } = interaction!;
    const member = guild!.members.cache.get(id);
    const vc = member?.voice?.channel;
    const serverQueue = queue.get(guild!.id);
    const currentSong = serverQueue?.songs.at(0);

    serverQueue?.songs.shift();
    const nextSong = serverQueue?.songs.at(0);

    if (!vc) {
        return await interaction.followUp({
            content: "Must be in a voice channel to use this command",
        });
    }

    if (!serverQueue) {
        return await interaction.followUp({
            content: "No songs left to skip!",
        });
    }

    if (!nextSong) {
        serverQueue.connection?.destroy();
        await interaction.followUp({
            content: `Skipped ${currentSong!.title}`,
        });

        return await interaction.followUp({ content: `Queue cleared!` });
    }

    await interaction.followUp({ content: `Skipped ${currentSong!.title}` });

    return play(guild!.id, nextSong, interaction);
};
