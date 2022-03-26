import { BaseCommandInteraction, Client } from "discord.js";

import { queue } from "../Structs/queue";

export const queueCommand = async (
    _client: Client,
    interaction: BaseCommandInteraction
) => {
    const serverQueue = queue.get(interaction.guild!.id);

    if (!serverQueue || !serverQueue.songs) {
        return await interaction.followUp({
            content: "No queue for this server",
        });
    }

    const queueString = serverQueue?.songs.map((song) => song.title);

    return await interaction.followUp({
        content: queueString!.join(" |=|=|=| "),
    });
};
