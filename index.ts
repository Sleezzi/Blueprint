/*
	We try to put comments everywhere in the code to make development easier, but in some places there may not be any.
	If you have any questions, you can view the documentation at https://redeye.sleezzi.fr/docs
	/!\ Before you begin, please read the LICENSE file /!\
	/!\ This bot was made by Sleezzi. /!\
*/

console.log('\x1bc'); // Clear the console
process.title = "RedEye・Loading...";
import {
	GatewayIntentBits, // This will be useful for permissions
	Partials, // This will be useful for permissions
	ActivityType, // This will be useful to modify the presence
} from "discord.js"; // Recover Discord module
import { Client } from "./interfacies";


export let client = new Client({ // Create a new Discord client
	presence: { // Define presence
		status: "idle", // Set the bot status => https://discordjs.guide/popular-topics/faq.html#how-do-i-make-my-bot-display-online-idle-dnd-invisible
		activities: [ { type: ActivityType.Playing, name: "Starting...", url: "https://discord.gg/xKxSt7Ke8x", state: "Please wait" } ] // Set the precense => https://discordjs.guide/popular-topics/faq.html#how-do-i-set-my-status-to-watching-listening-to-competing-in
	},
	// /!\ Here we take them all, this is not recommended by Discord which is why we recommend that you only put the one you use /!\
	// You can watch the Discord.js documentation at https://discordjs.guide/popular-topics/intents.html
	intents: [ // Set permissions
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildEmojisAndStickers
	],
	partials: [ // Set the partials (https://discordjs.guide/popular-topics/partials.html)
		Partials.Message,
		Partials.Channel,
		Partials.GuildMember,
		Partials.Reaction,
		Partials.User
	]
});

import { Init } from "./init";

console.clear(); // Clear the console

client = Init(client);

client.login(client.config.token); // Register the bot on Discord