const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Changes the volume of the current song.")
    .addStringOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount to change the volume by.")
        .setRequired(true)
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

    const vol = interaction.options.get("amount");

    if (!vol)
      return void interaction.followUp({
        content: `🎧 | Current volume is **${queue.volume}**%!`,
      });

    if (vol.value < 0 || vol.value > 100)
      return void interaction.followUp({
        content: "❌ | Volume range must be 0-100",
      });

    const success = queue.setVolume(vol.value);

    return void interaction.followUp({
      content: success
        ? `✅ | Volume set to **${vol.value}%**!`
        : "❌ | Something went wrong!",
    });
  },
};
