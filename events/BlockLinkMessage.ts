import { Guild, Message } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";

const createRole = async (guild: Guild) => {
	const role = await guild?.roles.create({
		name: "Ignore Automod",
		mentionable: false,
		color: "DarkRed",
		permissions: []
	});
	return role
}

const event: Event = {
	name: "AutoModMessage",
	event: "messageCreate", // When a message is posted
	type: "on",
	async execute([message]: [Message], client) {
		try {
			if (message.channel.type === 1 || // If the is from DM
				message.author.bot || // If the message is from a bot
				!message.deletable // If the message cannot be deleted by the bot
			) return; // End here
			const link: DatabaseInterface["server"]["modules"]["link"] = await client.database.get(`/${message.guild?.id}/modules/link`); // Retrieves data from server
			
			let messageModerated = message.content.toLowerCase();
			
			if (link?.active !== true) return;
			
			if (!link?.ignore) {
				const role = await createRole(message.guild as Guild);
				message.guild?.members.cache.get(message.guild?.ownerId)?.roles.add(role?.id as string);
				client.database.set(`/${message.guild?.id}/modules/link/ignore`, role?.id);
			}
			
			if (message.member?.roles.cache.has(link.ignore)) {
				return;
			}
			
			const regex = /\b((https?|ftp):\/\/|www\.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]/ig;
			if (regex.test(messageModerated.replace(/\*link blocked\*/g, ""))) {
				messageModerated = messageModerated.replace(regex, "*link blocked*");
			}
			
			if (messageModerated !== message.content.toLowerCase()) {
				message.delete();
				message.channel.send(`<@${message.member?.user.id}>: ${messageModerated}`);
			}
		} catch (err) { console.error(err); }
	}
}

module.exports = event;