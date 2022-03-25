import { Client } from "discord.js";

import { time } from "../Structs/time";

export const voiceChange = (client: Client) => {
    client.on("voiceStateUpdate", (oldState, newState) => {
        if (oldState.channelId === newState.channelId) return;

        const userID = oldState?.member?.id!;

        const userState = time.get(userID);

        if (!oldState.channelId && newState.channelId) {
            time.set(userID, { timeLeft: undefined, timeJoined: new Date() });
        } else if (oldState.channelId && !newState.channelId) {
            time.set(userID, { ...userState, timeLeft: new Date() });
        } else if (oldState.channelId !== newState.channelId) {
            time.set(userID, { timeJoined: new Date(), timeLeft: undefined });
        }
    });
};
