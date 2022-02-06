import { Message, MessageEmbed } from "discord.js";
import axios from "axios";

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message: Message) {
    if (message.author.bot) return;
    if (message.cleanContent === "test") await message.reply("test");
    else if (message.cleanContent === "profile")
      await message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("Profile")
            .setColor("BLURPLE")
            .setThumbnail(message.author.avatarURL())
            .addField("Name", message.author.username, true)
            .addField("Tag", message.author.discriminator, true),
        ],
      });
    else if (message.cleanContent === "trending") {
      const trends = await this.fetchData();
      await message.channel.send({
        embeds: trends,
      });
    }
  },
};
