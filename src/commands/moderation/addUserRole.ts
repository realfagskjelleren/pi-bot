import {
	ApplicationCommandOptionType,
	CommandInteraction,
	GuildMember,
	Role,
	User,
} from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';

@Discord()
export class AddUserRole {
	@Slash({ description: "Add a role to a user", name: 'add-user-role' })
	async execute(
		@SlashOption({
			description: 'The user you wish to give a role to',
			name: 'user',
			required: true,
			type: ApplicationCommandOptionType.User,
		})
		user: User,
		@SlashOption({
			description: 'The role you wish to give the user',
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
				content: `You cannot give a role higher than your own`,
			});
			return;
		}
		if (member.roles.cache.has(role.id)) {
			interaction.reply({
				ephemeral: true,
				content: `User ${user} already has role ${role}`,
			});
			return;
		}

		member.roles.add(role);
		interaction.reply({
			ephemeral: true,
			content: `Added role ${role} to ${user}`,
		});
	}
}
