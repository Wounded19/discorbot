const { SlashCommandBuilder } = require("@discordjs/builders");
const ytdl = require("ytdl-core-discord");
const {
  AudioPlayerStatus,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require("@discordjs/voice");

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
    console.log(interaction);

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
  },
};
