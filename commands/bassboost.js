const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bassboost")
    .setDescription("Toggle bassboost filter"),

  async execute(interaction) {
    const client = interaction.client;

    await interaction.deferReply();

    const queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return void interaction.reply({
        content: "❌ | No music is being played!",
      });

    await queue.setFilters({
      bassboost: !queue.getFiltersEnabled().includes("bassboost"),
      normalizer2: !queue.getFiltersEnabled().includes("bassboost"),
    });

    return void interaction.followUp({
      content: `🎵 | Bassboost ${
        queue.getFiltersEnabled().includes("bassboost") ? "Enabled" : "Disabled"
      }!`,
    });
  },
};
