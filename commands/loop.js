const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Loop the current song"),

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
        ? "🔂"
        : loopMode === QueueRepeatMode.QUEUE
        ? "🔁"
        : "▶";

    return void interaction.followUp({
      content: success
        ? `${mode} | Updated loop mode!`
        : "❌ | Could not update loop mode!",
    });
  },
};
