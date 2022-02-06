import { Interaction, MessageEmbed } from "discord.js";
import axios from "axios";
const { TWIT_TOKEN: twit_token } = process.env;

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "trending") {
      const embeds = await fetchData();
      interaction.channel.send({
        embeds,
      });
      interaction.reply({
        content: "Currently Tredning in the United States",
      });
    }
  },
};

const fetchData = async () => {
  const { data } = await axios.get(
    "https://api.twitter.com/1.1/trends/place.json?id=23424977",
    {
      headers: {
        Authorization: `Bearer ${twit_token}`,
      },
    }
  );
  console.log(data[0].trends.slice(0, 10));

  return data[0].trends.slice(0, 10).map((item) => {
    return new MessageEmbed()
      .setTitle(item.name)
      .setDescription(`Twitter: ${item.name}`)
      .addField("# of tweets", `${item.tweet_volume || "..."}`, true)
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/124/124021.png")
      .setColor("BLUE")
      .setURL(item.url);
  });
};
