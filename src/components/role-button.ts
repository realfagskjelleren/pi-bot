import {
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	GuildMember,
	Role,
} from 'discord.js';
import { ButtonComponent, ComponentOptions, Discord } from 'discordx';

@Discord()
export class Rolebtn {
	constructor(
		role: Role,
		label: string = 'Get Role!',
		emoji: string = '',
		style: ButtonStyle = ButtonStyle.Primary,
		reply: string = ''
	) {

		this.role = role;
		this.label = label;
		this.emoji = emoji;
		this.style = style;
		this.reply = reply;
	}

	private role: Role;
	private label: string;
	private emoji: string;
	private style: ButtonStyle;
	private reply: string;
	
	getButton(): ButtonBuilder {
		return new ButtonBuilder()
			.setCustomId(`rolebtn-${this.role.id}}`)
			.setLabel(this.label)
			.setStyle(this.style)
			.setEmoji(this.emoji);
	}

	@ButtonComponent() // FIXME: this god damn 'this' may not be defined bullshit is driving me insane 
	btnHandler(i: ButtonInteraction ): void {
        const member = i.member as GuildMember;
        const roles = member.roles;

		if (!this.role) {
			i.reply({ ephemeral: true, content: 'Role not found' });
			return;
		}
		if (
			roles.cache.has(this?.role?.id)
		) {
			i.reply({
				ephemeral: true,
				content: 'You already have this role',
			});
			return;
		}

		roles.add(this.role);
		i.reply({
			ephemeral: true,
			content: this.reply,
		});
	}
}