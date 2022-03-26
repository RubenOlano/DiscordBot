import { Client } from "discord.js";

import { checkUser } from "../lib/database";

export const voiceChange = (client: Client) => {
    client.on("voiceStateUpdate", async (oldState, newState) => {
        if (oldState.channelId === newState.channelId) return;

        const userID = oldState?.member?.id!;
        const userData = await checkUser(userID);

        if (!oldState.channelId && newState.channelId) {
            userData.timeJoined = new Date();
            userData.timeLeft = undefined;
        } else if (oldState.channelId && !newState.channelId) {
            userData.timeLeft = new Date();
        } else if (oldState.channelId !== newState.channelId) {
            userData.timeLeft = undefined;
            userData.timeJoined = new Date();
        }

        await userData.save();
    });
};
