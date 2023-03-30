import {
    BaseGuildTextChannel,
    EmbedBuilder,
    Message
} from 'discord.js';
import * as gifSearch from 'gif-search';
import {
    bot,
    GIPHY_ATR_IMG,
    RFK_BANNER,
    RFK_ORANGE
} from '../main.js';
gifSearch.setAPIKey(process.env.GIPHY_API_KEY as string);

bot.on('guildMemberAdd', async (member) => {
	const channel = member.guild.channels.cache.find(
		(channel) => channel.name === 'velkommen'
	) as BaseGuildTextChannel;
	if (!channel) return;
	const gif = (await gifSearch.random('cheers')) as string;
	const embed = new EmbedBuilder() // TODO: Add functionality to get greetings from a database
		.setColor(RFK_ORANGE)
		.setTitle('Velkommen til RFK!') // TODO: Add PiDame emoji
		.setURL('https://realfagskjelleren.no')
		.setThumbnail(RFK_BANNER) // TODO: Get logo from realfagskjelleren.no
		.setDescription(
			`Velkommen til Realfagskjelleren, ${member}!\nLa oss alle ta en skål! 🍻`
		)
		.setImage(gif)
		.setFooter({ text: 'Powered By GIPHY', iconURL: GIPHY_ATR_IMG });

	const message = (await channel.send({ embeds: [embed] })) as Message;
	message.react('🍻');
});
