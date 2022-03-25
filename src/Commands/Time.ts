import { Command } from "../Command";
import { timeCommand } from "../Helper/time";

export const Time: Command = {
    name: "time",
    description: "Shows the time a user has been in a voice channel",
    options: [
        {
            name: "user",
            description: "The user in '@' format",
            type: "STRING",
            required: true,
        },
    ],
    run: timeCommand,
};
