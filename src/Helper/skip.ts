import { BaseCommandInteraction, Client } from "discord.js";

import { queue } from "../Structs/queue";
import { play } from "./play";

export const skip = (_client: Client, interaction: BaseCommandInteraction) => {
    const { guild } = interaction!;
    const member = guild!.members.cache.get(interaction.user.id);
    const vc = member?.voice?.channel;
    const serverQueue = queue.get(guild!.id);

    serverQueue?.songs.shift();
    const nextSong = serverQueue?.songs.at(0);

    if (!vc) {
        return interaction.followUp({
            content: "Must be in a voice channel to use this command",
        });
    }

    if (!serverQueue || !nextSong) {
        return interaction.followUp({
            content: "No songs left to skip!",
        });
    }

    return play(guild!.id, nextSong, interaction);
};
