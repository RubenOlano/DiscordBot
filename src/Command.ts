import { ChatInputApplicationCommandData } from "discord.js";

import { commandFunction } from "./types/commandFunction";

export interface Command extends ChatInputApplicationCommandData {
    run: commandFunction;
}
