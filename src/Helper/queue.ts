import { BaseCommandInteraction, Client } from "discord.js";

import { queue } from "../Structs/queue";

export const queueCommand = (
    _client: Client,
    interaction: BaseCommandInteraction
) => {
    const serverQueue = queue.get(interaction.guild!.id);

    if (!serverQueue) {
        interaction.followUp({ content: "No queue for this server" });
    }

    const queueString = serverQueue?.songs.map((song) => song.title);

    interaction.followUp({ content: queueString!.join("||") });
};
