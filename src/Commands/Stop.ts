import { Command } from "../Command";
import { stop } from "../Helper/stop";

export const Stop: Command = {
    name: "stop",
    description: "Stops any songs in the queue and empties queue",
    run: stop,
};
