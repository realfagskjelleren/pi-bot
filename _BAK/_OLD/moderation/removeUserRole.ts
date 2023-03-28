import {
	ApplicationCommandOptionType,
	CommandInteraction,
	GuildMember,
	Role,
	User,
} from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';

@Discord()
export class removeUserRole {
	@Slash({ description: "Remove a role from a user", name: 'remove-user-role' })
	async execute(
		@SlashOption({
			description: 'The user you wish to remove a role from',
			name: 'user',
			required: true,
			type: ApplicationCommandOptionType.User,
		})
		user: User,
		@SlashOption({
			description: 'The role you wish to remove from the user',
			name: 'role',
			required: true,
			type: ApplicationCommandOptionType.Role,
		})
		role: Role,
		interaction: CommandInteraction
	) {
		const member = interaction.guild?.members.cache.get(user.id);

		if (!member) {
			interaction.reply({
				ephemeral: true,
				content: `Couldn't find user ${user} on this server`,
			});
			return;
		}
		if (
			role.position >=
			(interaction.member as GuildMember).roles.highest.position
		) {
			interaction.reply({
				ephemeral: true,
				content: `You cannot remove a role higher than your own`,
			});
			return;
		}
		if (!member.roles.cache.has(role.id)) {
			interaction.reply({
				ephemeral: true,
				content: `User ${user} doesn't have role ${role}`,
			});
			return;
		}

		member.roles.remove(role);
		interaction.reply({
			ephemeral: true,
			content: `Removed role ${role} from ${user}`,
		});
	}
}
