import { ActivityType } from "discord.js";
import { bot } from "../main.js";

bot.once("ready", async () => {
  await bot.guilds.fetch(); // Make sure all guilds are cached
  await bot.initApplicationCommands(); // Sync all appcommands with Discord

  console.log("🤖 --< I AM... ALIVE? >");
  console.log(
    `🤖 --< Logged in as '${bot.user?.tag}' in ${bot.guilds.cache.size} servers >`,
  );
  bot.user?.setActivity("Ludøl", { type: ActivityType.Playing });
});
