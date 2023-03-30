import {
    BaseGuildTextChannel,
    EmbedBuilder,
    GuildMember,
    Message,
    PartialGuildMember,
    Role
} from 'discord.js';
import * as gifSearch from 'gif-search';
import { bot, RFK_BANNER, RFK_ORANGE } from '../main.js';
gifSearch.setAPIKey(process.env.GIPHY_API_KEY as string);

const verified = (member: GuildMember | PartialGuildMember) => {
	return member.roles.cache.find((role) => role.name === 'Medlem') as Role;
};

bot.on('guildMemberUpdate', async (oldMember, newMember) => {
	if (!verified(newMember) || verified(oldMember)) return;

	const welcome_channel = newMember.guild.channels.cache.find(
		(channel) => channel.name === 'velkommen'
	) as BaseGuildTextChannel;
	if (!welcome_channel) return;

	const gif = (await gifSearch.random('cheers')) as string;

	const embed = new EmbedBuilder() // TODO: Add functionality to get greetings from a database
		.setColor(RFK_ORANGE)
		.setTitle('Velkommen til RFK!') // TODO: Add PiDame emoji
		.setURL('https://realfagskjelleren.no')
		.setThumbnail(RFK_BANNER) // TODO: Get logo from realfagskjelleren.no
		.setDescription(
			`Velkommen til Realfagskjelleren, ${newMember}!\nLa oss alle ta en skål! 🍻`
		)
		.setImage(gif)
		.setFooter({ text: 'Powered By GIPHY' });

	const message = (await welcome_channel.send({ embeds: [embed] })) as Message;
	message.react('🍻');
});
