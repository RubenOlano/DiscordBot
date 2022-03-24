import { Command } from "../Command";
import { playFunction } from "../Helper/play";

export const Play: Command = {
    name: "play",
    description: "Queue a video based on the url that is given",
    type: "CHAT_INPUT",
    options: [
        {
            name: "query",
            description: "Enter the a song or video you would like to play",
            type: "STRING",
            required: true,
        },
    ],
    run: playFunction,
};
