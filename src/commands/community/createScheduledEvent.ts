import { sanitizeUrl } from '@braintree/sanitize-url';
import type { Attachment, GuildScheduledEvent } from 'discord.js';
import {
	ApplicationCommandOptionType,
	CommandInteraction,
	Guild,
	GuildScheduledEventCreateOptions,
	GuildScheduledEventEntityType,
	GuildScheduledEventManager,
	GuildScheduledEventPrivacyLevel,
	GuildVoiceChannelResolvable,
	InteractionReplyOptions
} from 'discord.js';
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import { bot } from '../../main.js';

@Discord()
export class CreateScheduledEvent {
	@Slash({
		description: 'Create a scheduled event',
		name: 'create-scheduled-event',
	})
	async execute(
		@SlashOption({
			description: 'Event name',
			name: 'name',
			required: true,
			type: ApplicationCommandOptionType.String,
		}) name: string,

		@SlashOption({
			description: 'Event description',
			name: 'description',
			required: true,
			type: ApplicationCommandOptionType.String,
		}) description: string,

		@SlashOption({
			description: 'Event start time',
			name: 'start-time',
			required: true,
			type: ApplicationCommandOptionType.String,
		}) startTime: string,

		@SlashOption({
			description: 'Event end time',
			name: 'end-time',
			required: true,
			type: ApplicationCommandOptionType.String,
		}) endTime: string,

		@SlashChoice('Voice', 'External')
		@SlashOption({
			description: 'Event type',
			name: 'event_type',
			required: true,
			type: ApplicationCommandOptionType.String,
		}) event_type: string,

		@SlashOption({
			description: 'Event location (Optional, defaults to "Realfagskjelleren")',
			name: 'location',
			required: false,
			type: ApplicationCommandOptionType.String,
		}) location: string = 'Realfagskjelleren',

		@SlashOption({
			description: 'Upload event image (Optional, defaults to rfk logo)',
			name: 'image',
			required: false,
			type: ApplicationCommandOptionType.Attachment,
		}) image: Attachment | string = 'https://images.squarespace-cdn.com/content/v1/61eeb21558235b048d9ca47c/1665414460649-WT01WM3GU3255GX9J2VX/Lyskasse_oransj_svart.png?format=1500w',

		@SlashOption({
			description: 'Event Voice Channel Name (Optional, defaults to "General")',
			name: 'channel_name',
			required: false,
			type: ApplicationCommandOptionType.String,
		}) channel_name: string = 'General',

		interaction: CommandInteraction
	): Promise<void> {
		const event_type_int: number = GuildScheduledEventEntityType[event_type as keyof typeof GuildScheduledEventEntityType];
		await interaction.deferReply({ ephemeral: true });
		const guild: Guild = bot.guilds.cache.get(
			process.env.GUILD_ID as string
		) as Guild;
		const manager: GuildScheduledEventManager = guild.scheduledEvents;
		const channel_id = guild.channels.cache.find(
			(channel) => channel.name === channel_name
		);
		const options: GuildScheduledEventCreateOptions = {
			name: name,
			description: description,
			scheduledStartTime: new Date(startTime),
			scheduledEndTime: new Date(endTime),
			image: ((typeof image == "string" ? sanitizeUrl(image) : image.url)).replace('http://', 'https://'),
			privacyLevel: 2 as GuildScheduledEventPrivacyLevel,
			entityType: event_type_int,
			entityMetadata: { location: location },
			channel: channel_id as GuildVoiceChannelResolvable,
		};

		manager.create(options).then((event: GuildScheduledEvent) => {
			const replystring = `Event created: ${event.name}\nScheduled for: ${startTime} to ${endTime}\n${event_type_int == 3 ? 'Location: ' + location : 'Voidce Channel: ' + channel_name}`;

			interaction.editReply({
				ephemeral: true,
				content: replystring,
			} as InteractionReplyOptions);
		});
	}
}
