import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import * as dotenv from "dotenv"; dotenv.config();

export const bot = new Client({
  // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)], // Limit bot commands to specific guilds
  intents: [
    IntentsBitField.Flags.Guilds,
    // IntentsBitField.Flags.GuildMembers,
    // IntentsBitField.Flags.GuildMessages,
    // IntentsBitField.Flags.GuildMessageReactions,
    // IntentsBitField.Flags.GuildVoiceStates,
    // IntentsBitField.Flags.MessageContent,
  ],
  silent: false, // If true, debug messages are not logged
  simpleCommand: { // Config for @simpleCommand decorator
    prefix: "!",
  },
});

bot.once("ready", async () => {
  // await bot.guilds.fetch(); // Make sure all guilds are cached
  await bot.initApplicationCommands(); // Sync all appcommands with Discord

  console.log("🤖 --< I AM... ALIVE? >");
  console.log(`🤖 --< Logged in as ${bot.user?.tag} >`);
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

const run = async () => {
  // await importx(__dirname + "/{events,commands}/**/*.{ts,js}"); // CommonJS
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`); // ECMAScript

  if (!process.env.BOT_TOKEN) throw Error("No BOT_TOKEN in your env");

  await bot.login(process.env.BOT_TOKEN);
};

run();
