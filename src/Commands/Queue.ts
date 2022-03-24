import { Command } from "../Command";
import { queueCommand } from "../Helper/queue";

export const Queue: Command = {
    name: "queue",
    description: "Displays the songs that are currently in queue",
    run: queueCommand,
};
