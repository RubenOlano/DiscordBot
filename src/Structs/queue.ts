import { VoiceConnection } from "@discordjs/voice";
import { TextBasedChannel, VoiceBasedChannel } from "discord.js";

import { Song } from "./song";

export interface QueueConstruct {
    textChannel?: TextBasedChannel | null;
    voiceChannel: VoiceBasedChannel;
    songs: Song[];
    connection?: VoiceConnection;
    volume: number;
    playing: boolean;
}

export const queue = new Map<string, QueueConstruct>();
