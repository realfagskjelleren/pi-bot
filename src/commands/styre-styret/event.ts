import { sanitizeUrl } from "@braintree/sanitize-url";
import type { Attachment, GuildScheduledEvent } from "discord.js";
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  Guild,
  GuildScheduledEventCreateOptions,
  GuildScheduledEventEntityType,
  GuildScheduledEventManager,
  GuildScheduledEventPrivacyLevel,
  GuildVoiceChannelResolvable,
  InteractionReplyOptions,
} from "discord.js";
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx";

const default_image: string =
  "https://images.squarespace-cdn.com/content/v1/61eeb21558235b048d9ca47c/1665414460649-WT01WM3GU3255GX9J2VX/Lyskasse_oransj_svart.png?format=1500w";

async function create_event(
  interaction: CommandInteraction,
  name: string,
  description: string,
  startTime: string,
  endTime: string,
  event_type: GuildScheduledEventEntityType,
  location: string,
  image: string | Attachment = default_image,
  channel_name: string = "General",
) {
  await interaction.deferReply({ ephemeral: true });

  const guild: Guild = interaction.client.guilds.cache.get(
    interaction.guildId as string,
  ) as Guild;

  const channel_id = guild.channels.cache.find(
    (channel) => channel.name === channel_name,
  );

  const manager: GuildScheduledEventManager = guild.scheduledEvents;
  const options: GuildScheduledEventCreateOptions = {
    name: name,
    description: description,
    scheduledStartTime: new Date(startTime),
    scheduledEndTime: new Date(endTime),
    image: (typeof image == "string" ? sanitizeUrl(image) : image.url).replace(
      "http://",
      "https://",
    ),
    privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
    entityType: event_type,
    entityMetadata: { location: location },
    channel: channel_id as GuildVoiceChannelResolvable,
  };

  manager.create(options).then((event: GuildScheduledEvent) => {
    const replystring =
      `Event created: ${event.name}\nScheduled for: ${startTime} to ${endTime}\n${
        event_type == GuildScheduledEventEntityType.External
          ? "Location: " + location
          : "Voidce Channel: " + channel_name
      }`;

    interaction.editReply({
      ephemeral: true,
      content: replystring,
    } as InteractionReplyOptions);
  });
}

@Discord()
@SlashGroup({ description: "Manage events", name: "event" })
@SlashGroup({ description: "Create events", name: "create", root: "event" })
@SlashGroup("create", "event")
export class CreateGeneralEvent {
  @Slash({
    description: "Create a scheduled event",
    name: "general-event",
  })
  async execute(
    @SlashOption({
      description: "Event name",
      name: "name",
      required: true,
      type: ApplicationCommandOptionType.String,
    }) name: string,
    @SlashOption({
      description: "Event description",
      name: "description",
      required: true,
      type: ApplicationCommandOptionType.String,
    }) description: string,
    @SlashOption({
      description: "Event start time",
      name: "start-time",
      required: true,
      type: ApplicationCommandOptionType.String,
    }) startTime: string,
    @SlashOption({
      description: "Event end time",
      name: "end-time",
      required: true,
      type: ApplicationCommandOptionType.String,
    }) endTime: string,
    @SlashChoice(
      { name: "Online", value: GuildScheduledEventEntityType.Voice },
      { name: "IRL", value: GuildScheduledEventEntityType.External },
    )
    @SlashOption({
      description: "Event type",
      name: "event_type",
      required: true,
      type: ApplicationCommandOptionType.Integer,
    })
    event_type: GuildScheduledEventEntityType,
    @SlashOption({
      description: 'Event location (Optional, defaults to "Realfagskjelleren")',
      name: "location",
      required: false,
      type: ApplicationCommandOptionType.String,
    }) location: string = "Realfagskjelleren",
    @SlashOption({
      description: "Upload event image (Optional, defaults to rfk logo)",
      name: "image",
      required: false,
      type: ApplicationCommandOptionType.Attachment,
    }) image: Attachment | string,
    @SlashOption({
      description: 'Event Voice Channel Name (Optional, defaults to "General")',
      name: "channel_name",
      required: false,
      type: ApplicationCommandOptionType.String,
    }) channel_name: string,
    interaction: CommandInteraction,
  ): Promise<void> {
    create_event(
      interaction,
      name,
      description,
      startTime,
      endTime,
      event_type,
      location,
      image,
      channel_name,
    );
  }
}

@Discord()
@SlashGroup("event", "create")
export class Fredagsapent {
  @Slash({ description: "Sett opp en Fredagsåpning", name: "fredagsapent" })
  async execute(
    @SlashOption({
      description: "Date",
      name: "date",
      required: true,
      type: ApplicationCommandOptionType.String,
    }) date: string,
    interaction: CommandInteraction,
  ) {
    const startTime = date + " 18:00:00";
    const endTime = date + " 23:30:00";
    const name = "Fredagsåpning";
    const description = "Fredagsåpning";
    const event_type = GuildScheduledEventEntityType.External;
    const location = "Realfagskjelleren";
    const image = undefined;
    const channel_name = undefined;
    create_event(
      interaction,
      name,
      description,
      startTime,
      endTime,
      event_type,
      location,
      image,
      channel_name,
    );
  }
}

@Discord()
@SlashGroup("event")
class UpdateScheduledEvent {}

@Discord()
@SlashGroup("event")
class DelteScheduledEvent {}

@Discord()
@SlashGroup("event")
class GetScheduledEvent {}
