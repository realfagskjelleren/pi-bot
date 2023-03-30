import {
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildMember,
} from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";
import { bot } from "../../../main.js";

@Discord()
@SlashGroup({ name: "emit", description: "Emit events", root: "admin" })
@SlashGroup("emit", "admin")
export class GuildMemberAdd {
  @Slash({
    name: "guild-member-add",
    description: "Emit the guildMemberAdd event",
  })
  async test(
    @SlashOption({
      name: "guild-member",
      description: "member to test",
      required: true,
      type: ApplicationCommandOptionType.User,
    }) member: GuildMember,
    interaction: CommandInteraction,
  ) {
    await interaction.deferReply();
    bot.emit("guildMemberAdd", member);
    interaction.editReply("done");
  }
}
