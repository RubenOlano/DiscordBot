import { Command } from "../Command";
import { skip } from "../Helper/skip";

export const Skip: Command = {
    name: "skip",
    description: "Skips a song that is in the queue",
    type: "CHAT_INPUT",
    run: skip,
};
