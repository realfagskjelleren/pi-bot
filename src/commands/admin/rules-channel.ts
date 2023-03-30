import { ActionRowBuilder, ApplicationCommandOptionType, ButtonStyle, CommandInteraction, EmbedBuilder, MessageActionRowComponentBuilder, Role } from 'discord.js';
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import { Rolebtn } from '../../components/role-button.js';
import { RFK_BANNER, RFK_ORANGE } from '../../main.js';

@Discord()
export class RulesChannel {
	@Slash({ name: 'rules-channel', description: 'Set the rules channel' })
	async execute(
		@SlashOption({
			name: 'channel',
			description: 'Channel to set as rules channel',
			required: true,
			type: ApplicationCommandOptionType.Channel,
		})
		channel: string,
		@SlashOption({
			name: 'message',
			description: 'Message to set as rules message',
			required: true,
			type: ApplicationCommandOptionType.String,
		})
		message: string,
		@SlashOption({
			name: 'role',
			description: 'Role to give when button is pushed',
			required: true,
			type: ApplicationCommandOptionType.Role,
		})
		role: Role,
		@SlashOption({
			name: 'reply',
			description: 'Reply after button is pushed',
			required: false,
			type: ApplicationCommandOptionType.String,
		})
		reply: string,
		@SlashOption({
			name: 'button-label',
			description: 'Label for the button',
			required: false,
			type: ApplicationCommandOptionType.String,
		})
		buttonLabel: string = 'Jeg skal følge reglene',
		@SlashChoice({ name: 'Primary', value: ButtonStyle.Primary }, { name: 'Secondary', value: ButtonStyle.Secondary }, { name: 'Success', value: ButtonStyle.Success }, { name: 'Danger', value: ButtonStyle.Danger }, { name: 'Link', value: ButtonStyle.Link})
		@SlashOption({
			name: 'button-style',
			description: 'Style for the button',
			required: false,
			type: ApplicationCommandOptionType.Integer,
		})
		buttonStyle: ButtonStyle = ButtonStyle.Success,
		@SlashOption({
			name: 'button-emoji',
			description: 'Emoji for the button',
			required: false,
			type: ApplicationCommandOptionType.String,
		})
		buttonEmoji: string = '👍',
		interaction: CommandInteraction
	): Promise<void> {
		const confirm_button = new Rolebtn(role, buttonLabel, buttonEmoji, buttonStyle, reply).getButton();
		const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(confirm_button);
		const rules_embed = new EmbedBuilder()
			.setTitle('Regler')
			.setDescription(message)
			.setColor(RFK_ORANGE)
			.setThumbnail(RFK_BANNER)
			
		interaction.reply({ content: 'Rules channel set', ephemeral: true });
		
		interaction.channel?.send({ embeds: [rules_embed], components: [row] });
	}
}

/*
	const rules_channel = newMember.guild.channels.cache.find(
		(channel) => channel.name === 'regler'
	) as BaseGuildTextChannel;
    if (!rules_channel) return;

    const rules_message = rules_channel.messages.cache.last();

	// Let member choose which student union they are a part of
    const union_message = (await rules_message?.reply({ ephemeral: true, content: `Velkommen til RFK!\nHvilken Linjeforening er du med i?` })) as Message;
*/
