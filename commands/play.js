const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song."),
  async execute(interaction) {
    await interaction.reply("Plays a song!");
  },
};
