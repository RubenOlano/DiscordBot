import { Command } from "../Command";
import { playFunction } from "../Helper/play";

export const Play: Command = {
    name: "play",
    description: "Queue a video based on the url or name that is given",
    type: "CHAT_INPUT",
    options: [
        {
            name: "query",
            description: "Enter a song name or url to play",
            type: "STRING",
            required: true,
        },
    ],
    run: playFunction,
};
