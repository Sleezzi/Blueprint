import { Message } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";

const event: Event = {
	name: "LevelHandler",
	event: "messageCreate", // When a message is posted
	type: "on",
	async execute([message]: [Message], client) {
		try {
			if (message.channel.type === 1 || // If the message is from the DM's bot
				message.member?.user.bot // If the message is from a bot
			) return; // End here
			
			const texts = client.translate(message.guild?.preferredLocale as string, "events/Level");
			const moduleProps: DatabaseInterface["server"]["modules"]["levels"] = await client.database.get(`/${message.guild?.id}/modules/levels`); // Get the level's data
			
			if (!moduleProps.active) return;
			if (moduleProps.ignore && moduleProps.ignore.length > 1) {
				if (message.guild?.roles.cache.find(role => role.id === moduleProps.ignore)) {
					if (message.member?.roles.cache.has(moduleProps.ignore)) return
				} else {
					const role = await message.guild?.roles.create({
						name: "no exp",
						mentionable: false,
						color: "DarkRed",
						permissions: []
					});
					client.database.set(`/${message.guild?.id}/modules/levels/ignore`, role?.id as string);
				}
			} else {
				const role = await message.guild?.roles.create({
					name: "no exp",
					mentionable: false,
					color: "DarkRed",
					permissions: []
				});
				client.database.set(`/${message.guild?.id}/modules/levels/ignore`, role?.id as string);
			}
			let level: DatabaseInterface["server"]["levels"]["user"] = await client.database.get(`/${message.guild?.id}/levels/${message.member?.id}`); // Get the level's data
			if (level?.level) { // Checks if this is the member's first message
				level.xp++; // Add 1 xp
				if (level.xp >= (level.level * 150)) { // Check if we need to add a level to the member
					level.level++; // Add 1 level
					level.xp = 0; // Reset the xp
					const channel = await message.author.createDM();
					channel.send({ content: `GG <@${message.member?.id}>, ${texts.passedLevel} ${level.level}**` }); // Send a message to the member to let them know they have moved to the next level
				}
			} else level = { // Sets the data when it is the member's first message
				level: 1,
				xp: 1,
			}
			client.database.set(`/${message.guild?.id}/levels/${message.member?.id}`, level); // Saves data to database
		} catch (err) { console.error(err); }
	}
}
module.exports = event;