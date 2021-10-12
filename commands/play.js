const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song from a URL or search query.")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The name of the song to play.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const client = interaction.client;

    if (!client.application?.owner) await client.application?.fetch();

    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: "You are not in a voice channel!",
        ephemeral: true,
      });

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: "You are not in my voice channel!",
        ephemeral: true,
      });

    const query = interaction.options.get("song").value;

    await interaction.deferReply();

    const searchResult = await client.player
      .search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      })
      .catch((error) => {
        console.log("Error occured:", error);
      });

    if (!searchResult || !searchResult.tracks.length)
      return void interaction.followUp({ content: "No results were found!" });

    const queue = await client.player.createQueue(interaction.guild, {
      metadata: interaction.channel,
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      void client.player.deleteQueue(interaction.guildId);
      return void interaction.followUp({
        content: "Could not join your voice channel!",
      });
    }

    await interaction.followUp({
      content: `🎶 | ${
        searchResult.playlist
          ? `Playlist started - **${searchResult.tracks[0].title}**`
          : `Now playing **${searchResult.tracks[0].title}** - ${searchResult.tracks[0].duration}`
      }`,
    });

    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
