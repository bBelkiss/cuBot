const { MessageActionRow, MessageButton, EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'suggest',
    description: 'Envía una sugerencia en un embed.',
  },
  async execute(interaction) {
    const suggestion = interaction.options.getString('sugerencia');

    const channelIdCommands = '1165043056177856614'; 
    const channelIdSuggestions = '1165043034723995678'; 

    const commandsChannel = interaction.guild.channels.cache.get(channelIdCommands);
    const suggestionsChannel = interaction.guild.channels.cache.get(channelIdSuggestions);

    if (!commandsChannel || !suggestionsChannel) {
      return interaction.reply('No se pudo encontrar uno de los canales.');
    }

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Nueva Sugerencia')
      .setDescription(suggestion);

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('view_suggestion')
          .setLabel('Ver Sugerencia')
          .setStyle('PRIMARY')
      );

    await suggestionsChannel.send({ embeds: [embed], components: [row] });

    interaction.reply('Sugerencia enviada con éxito.');
  },
};
