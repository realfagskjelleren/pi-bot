import { ApplicationCommandOptionType, CommandInteraction, User } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';

@Discord()
export class SetUserRole {
	@Slash({ description: "Set a user's role", name: 'set-user-role' })
	async execute(
		@SlashOption({
			description: 'The user you wish to give a role to',
			name: 'user',
			required: true,
			type: ApplicationCommandOptionType.User,
		}) user: User,
        @SlashOption({
            description: 'The role you wish to give the user',
            name: 'role',
            required: true,
            type: ApplicationCommandOptionType.Role,
        }) role: string,
        interaction: CommandInteraction,
	) {
        const member = interaction.guild?.members.cache.get(user.id);
        if (!member) {
            interaction.reply(`Couldn't find user ${user} on this server`);
            return;
        }
        member.roles.add(role);
        interaction.reply(`Added role ${role} to ${user}`);
    }
}
