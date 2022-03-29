import { BaseCommandInteraction, Client } from "discord.js";

export interface commandFunction {
    (client: Client, interaction: BaseCommandInteraction): void;
}
