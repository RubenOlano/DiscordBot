import {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    StreamType,
} from "@discordjs/voice";
import { BaseCommandInteraction, Client } from "discord.js";
import ytdl from "ytdl-core";

import { Command } from "../Command";
import { queue, QueueConstruct } from "../Structs/queue";
import { Song } from "../Structs/song";

const playFunction = async (
    _client: Client,
    interaction: BaseCommandInteraction
) => {
    const { guild } = interaction!;
    const member = guild!.members.cache.get(interaction.user.id);
    const vc = member?.voice?.channel;

    if (!vc)
        return interaction.followUp({
            content: "Must be in a voice channel to use this command",
        });

    const link = interaction.options.get("url")?.value || undefined;

    if (!link) return interaction.followUp({ content: "Invalid link" });

    const {
        videoDetails: { title, video_url },
    } = await ytdl.getInfo(link as string);
    const song: Song = {
        title,
        url: video_url,
    };

    const hasID = guild?.id ? queue.has(guild.id) : false;

    if (!hasID) {
        const queueData: QueueConstruct = {
            textChannel: interaction?.channel,
            voiceChannel: vc,
            songs: [],
            playing: true,
            volume: 5,
            connection: undefined,
        };

        queue.set(interaction!.guild!.id, queueData);
        queueData.songs.push(song);

        try {
            const connection = joinVoiceChannel({
                channelId: vc.id,
                guildId: guild!.id,
                adapterCreator: guild!.voiceAdapterCreator,
            });

            queueData.connection = connection;
            const nextSong = queueData.songs.at(0);

            if (!nextSong) {
                queue.delete(guild!.id);

                return interaction.followUp({ content: "Error" });
            } else return play(guild!.id, nextSong, interaction);
        } catch (error) {
            queue.delete(guild!.id);
            console.log(error);

            return interaction.followUp({ content: error });
        }
    } else {
        const serverQueue = queue.get(guild!.id);

        serverQueue!.songs.push(song);

        return interaction.followUp({
            content: `Added **${song.title}** to the queue`,
        });
    }
};

const play = (
    guild: string,
    song: Song,
    interaction: BaseCommandInteraction
) => {
    const serverQueue = queue.get(guild);

    if (!song) {
        serverQueue!.connection!.destroy();
        queue.delete(guild);

        return interaction.followUp({ content: "Error" });
    }

    const stream = ytdl(song.url, { filter: "audioonly" });
    const resource = createAudioResource(stream, {
        inputType: StreamType.Arbitrary,
    });
    const player = createAudioPlayer();

    player.play(resource);
    serverQueue!.connection!.subscribe(player);
    player.on(AudioPlayerStatus.Idle, () => {
        serverQueue!.songs!.shift();
        const nextSong = serverQueue!.songs.at(0);

        if (!nextSong) queue.delete(guild);
        else play(guild, nextSong, interaction);
    });

    return interaction.followUp({ content: `Now playing **${song.title}**` });
};

export const Play: Command = {
    name: "play",
    description: "Queue a video based on the url that is given",
    type: "CHAT_INPUT",
    options: [
        {
            name: "video",
            description: "Nme of or link to the video being search",
            type: "STRING",
            required: true,
        },
    ],
    run: playFunction,
};
