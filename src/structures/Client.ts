import axios from "axios";
import {
  Client as DiscordClient,
  ClientOptions,
  Message,
  MessageEmbed,
} from "discord.js";
import { config } from "dotenv";
config();
const twit_token = process.env.TWIT_TOKEN;

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
      if (message.cleanContent === "test") await message.reply("test");
      else if (message.cleanContent === "profile")
        await message.channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle("Profile")
              .setThumbnail(message.author.avatarURL())
              .addField("Name", message.author.tag, true),
          ],
        });
      else if (message.cleanContent === "trending") {
        const trends = await this.fetchData();
        await message.channel.send({
          embeds: trends,
        });
      }
    });
  }

  async fetchData() {
    const { data } = await axios.get(
      "https://api.twitter.com/1.1/trends/place.json?id=23424977",
      {
        headers: {
          Authorization: `Bearer ${twit_token}`,
        },
      }
    );

    return data[0].trends.slice(0, 10).map((item) => {
      return new MessageEmbed()
        .setTitle(item.name)
        .addField("# of tweets", `${item.tweet_volume}`, true)
        .setThumbnail(item.url)
        .setColor("BLUE")
        .setURL(item.url);
    });
  }
}

export { Client };
