const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bassboost")
    .setDescription("Toggle bassboost filter"),
  async execute(interaction) {
    const { client } = require("..");

    await interaction.defer();

    const queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return void interaction.reply({
        content: "❌ | No music is being played!",
      });
    await queue.setFilters({
      bassboost: !queue.getFiltersEnabled().includes("bassboost"),
      normalizer2: !queue.getFiltersEnabled().includes("bassboost"), // because we need to toggle it with bass
    });

    setTimeout(() => {
      return void interaction.reply({
        content: `🎵 | Bassboost ${
          queue.getFiltersEnabled().includes("bassboost")
            ? "Enabled"
            : "Disabled"
        }!`,
      });
    }, 500);
  },
};
