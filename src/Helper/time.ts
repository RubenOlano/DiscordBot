import { BaseCommandInteraction, Client } from "discord.js";

import { checkUser } from "../lib/database";

const getMinutes = (join: Date, leave: Date) => {
    let diff = (leave.getTime() - join.getTime()) / 1000;

    diff /= 60;

    return Math.abs(Math.round(diff));
};

export const timeCommand = async (
    _client: Client,
    interaction: BaseCommandInteraction
) => {
    const user = interaction.options.get("user");

    const id = user!.value?.toString().replace(/[!<>@]/g, "");

    const userData = await checkUser(id!);

    if (userData.timeJoined) {
        if (!userData.timeLeft) {
            const diff = getMinutes(userData.timeJoined, new Date());

            interaction.followUp({
                content: `<@${id}> has been in the channel for ${diff} minutes`,
            });
        } else {
            const diff = getMinutes(userData.timeJoined, userData.timeLeft);

            interaction.followUp({
                content: `<@${id}> was in the channel for ${diff} minutes`,
            });
        }
    } else {
        interaction.followUp({ content: `<@${id}> has not been in a channel` });
    }
};
