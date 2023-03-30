import { ApplicationCommandOptionType, CommandInteraction, GuildMember } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { bot } from "../../../main.js";

@Discord()
export class Emit {
    @Slash({ name: 'emit', description: "emit different events (for testing)" })
    async test(
        @SlashOption({
            name: 'guild-member',
            description: 'member to test',
            required: true,
            type: ApplicationCommandOptionType.User,
        }) member: GuildMember,
        interaction: CommandInteraction,
    ) {
        await interaction.deferReply();
        bot.emit('guildMemberAdd', member );
        interaction.editReply('done');
    }
    }