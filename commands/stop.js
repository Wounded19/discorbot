const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the current song."),

  async execute(interaction) {
    const { client } = require("..");
    if (!client.application?.owner) await client.application?.fetch();

    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: "❌ | No music is being played!",
      });

    queue.destroy();

    return void interaction.followUp({
      content: "🛑 | Stopped the player!",
    });
  },
};
