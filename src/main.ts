import { dirname, importx } from '@discordx/importer';
import { ColorResolvable, GatewayIntentBits } from 'discord.js';
import { Client } from 'discordx';
import * as dotenv from 'dotenv';
dotenv.config();

export const bot = new Client({
	// botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)], // Limit bot commands to specific guilds
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
	],
	silent: false, // If true, debug messages are not logged
	simpleCommand: {
		// Config for @simpleCommand decorator
		prefix: '!',
	},
});

export const GIPHY_ATR_IMG: string = 'https://imgur.com/a/hWlc9qY'; // FIXME: GIPHY attribution image doesnt work
export const RFK_ORANGE: ColorResolvable = '#FD8200';
export const RFK_BANNER: string =
	'https://images.squarespace-cdn.com/content/v1/61eeb21558235b048d9ca47c/1665414460649-WT01WM3GU3255GX9J2VX/Lyskasse_oransj_svart.png?format=1500w';

const run = async () => {
	await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`); // ECMAScript

	if (!process.env.BOT_TOKEN) throw Error('No BOT_TOKEN in your env');

	await bot.login(process.env.BOT_TOKEN);
};

run();
