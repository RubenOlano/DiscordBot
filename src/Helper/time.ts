import { BaseCommandInteraction, Client } from "discord.js";

import { time } from "../Structs/time";

const getMinutes = (join: Date, leave: Date) => {
    let diff = (leave.getTime() - join.getTime()) / 1000;

    diff /= 60;

    return Math.abs(Math.round(diff));
};

export const timeCommand = (
    _client: Client,
    interaction: BaseCommandInteraction
) => {
    const user = interaction.options.get("user");

    const id = user!.value?.toString().replace(/[!<>@]/g, "");

    const userTime = time.get(id!);

    if (userTime && userTime.timeJoined) {
        if (!userTime?.timeLeft) {
            const diff = getMinutes(userTime.timeJoined, new Date());

            interaction.followUp({
                content: `<@${id}> has been in the channel for ${diff} minutes`,
            });
        } else {
            const diff = getMinutes(userTime.timeJoined, userTime.timeLeft);

            interaction.followUp({
                content: `<@${id}> was in the channel for ${diff} minutes`,
            });
        }
    } else {
        interaction.followUp({ content: `<@${id}> has not been in a channel` });
    }
};
