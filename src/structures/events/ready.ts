import { ApplicationCommandOptionType } from "discord-api-types";
import { Client } from "../Client";

module.exports = {
  name: "ready",
  once: true,
  execute(client: Client) {
    console.log(`Logged in as ${client.user.tag}`);
    const commands = client.application.commands;

    commands.create({
      name: "trending",
      description:
        "Returns top 10 trending results from Twitter in the United states",
      default_permission: true,
    });
  },
};
