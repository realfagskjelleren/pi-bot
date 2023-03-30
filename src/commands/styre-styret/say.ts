import {
  ApplicationCommandOptionType,
  CommandInteraction,
  TextChannel,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Say {
  @Slash({ name: "say", description: "Say something" })
  async execute(
    @SlashOption({
      name: "message",
      description: "Message to say",
      required: true,
      type: ApplicationCommandOptionType.String,
    }) message: string,
    @SlashOption({
      name: "channel",
      description: "Channel to say in",
      required: false,
      type: ApplicationCommandOptionType.Channel,
    }) channel: TextChannel,
    interaction: CommandInteraction,
  ) {
    await interaction.deferReply({ ephemeral: true });
    if (channel) {
      channel.send(message);
    } else {
      interaction.channel?.send(message);
    }
    interaction.editReply("Message sent!");
  }
}
