import { Message } from "discord.js";
import { bot } from "../main.js";

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});
