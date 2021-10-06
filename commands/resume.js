const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the current song."),

  async execute(interaction) {
    const client = interaction.client;
    if (!client.application?.owner) await client.application?.fetch();

    await interaction.deferReply();

    const queue = client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: "❌ | No music is being played!",
      });

    const paused = queue.setPaused(false);

    return void interaction.followUp({
      content: !paused ? "❌ | Something went wrong!" : "▶ | Resumed!",
    });
  },
};
