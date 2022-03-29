import { BaseCommandInteraction, Client } from "discord.js";
import { commandFunction } from "src/types/commandFunction";

import { checkUser } from "../lib/database";

const getDiff = (join: Date, leave: Date): string => {
    const diff = (leave.getTime() - join.getTime()) / 1000;

    if (diff < 60) {
        return `${Math.floor(diff)} seconds`;
    } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} minutes`;
    } else if (diff < 86_400) {
        return `${Math.floor(diff / 3600)} hours`;
    } else {
        return `${Math.floor(diff / 86_400)} day(s)`;
    }
};

export const timeCommand: commandFunction = async (
    _client: Client,
    interaction: BaseCommandInteraction
) => {
    const user = interaction.options.get("user")!.value!;

    const id = user.toString().replace(/[!<>@]/g, "");

    const userData = await checkUser(id);

    if (userData.timeJoined) {
        if (!userData.timeLeft) {
            const diff = getDiff(userData.timeJoined, new Date());

            interaction.followUp({
                content: `<@${id}> has been in the channel for ${diff}`,
            });
        } else {
            const diff = getDiff(userData.timeJoined, userData.timeLeft);

            interaction.followUp({
                content: `<@${id}> was in the channel for ${diff}`,
            });
        }
    } else {
        interaction.followUp({ content: `<@${id}> has not been in a channel` });
    }
};
