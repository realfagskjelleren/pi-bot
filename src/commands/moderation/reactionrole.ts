import {
  ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction,
  EmbedBuilder,
  GuildMember, MessageActionRowComponentBuilder, Role
} from 'discord.js';
import { ButtonComponent, Discord, Slash, SlashOption } from 'discordx';

@Discord()
export class ReactionRole {
	private role?: Role;
	private reply?: string;

	@Slash({ description: 'Rection role', name: 'reactrole' })
	async execute(
		@SlashOption({
			description: 'Role',
			name: 'role',
			required: true,
			type: ApplicationCommandOptionType.Role,
		})
		role: Role,
		@SlashOption({
			description: 'Header',
			name: 'header',
			required: true,
			type: ApplicationCommandOptionType.String,
		})
		header: string,
		@SlashOption({
			description: 'Body',
			name: 'body',
			required: true,
			type: ApplicationCommandOptionType.String,
		})
		body: string,
		@SlashOption({
			description: 'Reply after button is pushed',
			name: 'reply',
			required: false,
			type: ApplicationCommandOptionType.String,
		})
		reply: string,
		@SlashOption({
			description: 'Button label',
			name: 'label',
			required: false,
			type: ApplicationCommandOptionType.String,
		})
		label: string,
		interaction: CommandInteraction
	): Promise<void> {
		this.role = role;
		if (reply) this.reply = reply;

		await interaction.deferReply();

		const btn = new ButtonBuilder()
			.setCustomId('rolebtn')
			.setLabel(`${label ?? role.name}`)
			.setStyle(ButtonStyle.Primary);

		const row =
			new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
				btn
			);

		const embed = new EmbedBuilder()
			.setColor('#FD8200')
			.setTitle(`${header ?? 'Reaction Role'}`)
			.setDescription(`${body ?? 'Click the button to get the role'}`);

		await interaction.editReply({
			components: [row],
			embeds: [embed],
		});
	}

	@ButtonComponent({ id: 'rolebtn' })
	btn(interaction: ButtonInteraction): void {
		if (this.role) {
			(interaction.member as GuildMember).roles.add(this.role);
			interaction.reply({
				ephemeral: true,
				content: `${this.reply ?? 'You now have the role ' + this.role.name}`,
			});
		}
	}
}
