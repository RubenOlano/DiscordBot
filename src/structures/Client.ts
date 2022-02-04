import { Client as DiscordClient, ClientOptions, Message } from "discord.js";
class Client extends DiscordClient {
  public constructor(options: ClientOptions, token: string) {
    super(options);
    this.login(token);
  }

  start() {
    this.once("ready", () => {
      console.log(`Logged in as ${this?.user?.tag}`);
      this.user.setPresence({
        status: "online",
        activities: [{ name: "with typescript", type: "PLAYING" }],
      });
    });

    this.on("messageCreate", async (message: Message) => {
      if (message.author.bot) return;
      if (message.content === "test") await message.reply("test");
    });
  }
}

export { Client };
