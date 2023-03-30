import {
  ActivityType,
  ApplicationCommandOptionType,
  CommandInteraction,
} from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";

@Discord()
export class SetActivity {
  @Slash({ name: "set-activity", description: "Set piDamas Activity" })
  async execute(
    @SlashChoice({
      name: "Playing",
      value: ActivityType.Playing,
    }, {
      name: "Listening",
      value: ActivityType.Listening,
    }, {
      name: "Watching",
      value: ActivityType.Watching,
    }, {
      name: "Streaming",
      value: ActivityType.Streaming,
    }, {
      name: "Competing",
      value: ActivityType.Competing,
    })
    @SlashOption({
      name: "activity-type",
      description: "Activity type to set",
      required: true,
      type: ApplicationCommandOptionType.Integer,
    })
    activity: ActivityType,
    @SlashOption({
      name: "activity-name",
      description: "Activity name to set",
      required: true,
      type: ApplicationCommandOptionType.String,
    }) name: string,
    interaction: CommandInteraction,
  ) {
    await interaction.deferReply({ ephemeral: true });
    interaction.client.user?.setActivity(name, { type: activity.valueOf() });
    interaction.editReply("done!");
  }
}
