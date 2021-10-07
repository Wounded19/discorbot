const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueueRepeatMode } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Loop the current song")
    .addIntegerOption((option) =>
      option
        .setName("mode")
        .setDescription("Choose loop mode")
        .setRequired(true)
        .addChoices([
          ["Off", 0],
          ["Track", 1],
          ["Queue", 2],
          ["Autoplay", 3],
        ])
    ),

  async execute(interaction) {
    const client = interaction.client;

    if (!client.application?.owner) await client.application?.fetch();

    await interaction.deferReply();

    const queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: "❌ | No music is being played!",
      });

    const loopMode = interaction.options.get("mode").value;

    const success = queue.setRepeatMode(loopMode);

    const mode =
      loopMode === QueueRepeatMode.TRACK
        ? "🔂 Repeat Track"
        : loopMode === QueueRepeatMode.QUEUE
        ? "🔁 Repeat Queue"
        : "▶";

    return void interaction.followUp({
      content: success
        ? `${mode} | Updated loop mode!`
        : "❌ | Could not update loop mode!",
    });
  },
};
