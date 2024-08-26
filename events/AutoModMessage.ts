import { ChannelType, Guild, Message, WebhookClient } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";
import { readFileSync } from "fs";
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
			const automod: DatabaseInterface["server"]["modules"]["automod"] = await client.database.get(`/${message.guild?.id}/modules/automod`); // Retrieves data from server
			
			let messageModerated = message.content.toLowerCase();
			
			if (!automod.ignore) {
				const role = await createRole(message.guild as Guild);
				message.guild?.members.cache.get(message.guild?.ownerId)?.roles.add(role?.id as string);
				client.database.set(`/${message.guild?.id}/modules/automod/ignore`, role?.id);
			}
			if (message.member?.roles.cache.has(automod.ignore)) {
				return;
			}
			
			if (automod.defaultList) {
				const list = JSON.parse(readFileSync("./automod.json", "utf8"));
				for (const word of list) {
					const regex = new RegExp(word, "g")
					if (regex.test(messageModerated.replace(/\*word deleted\*/g, ""))) {
						messageModerated = messageModerated.replace(regex, "*word deleted*");
					}
				}
			}
			
			if (automod.words && automod.words[0]) {
				for (const word of automod.words) {
					const regex = new RegExp(word, "g")
					if (regex.test(messageModerated.replace(/\*word deleted\*/g, ""))) {
						messageModerated = messageModerated.replace(regex, "*word deleted*");
					}
				}
			}
			
			if (messageModerated !== message.content.toLowerCase()) {
				message.delete();
				if (message.channel.type === ChannelType.GuildText) {
					const webhook = await message.channel.createWebhook({
						name: message.member?.user.username as string,
						avatar: message.member?.avatarURL() as string,
					});
					webhook.send({
						content: messageModerated,
						username: message.member?.user.username,
						avatarURL: message.member?.user.avatarURL() || message.member?.user.defaultAvatarURL,
					});
					return;
				}
				message.channel.send(`<@${message.member?.user.id}>: ${messageModerated}`);
			}
		} catch (err) { console.error(err); }
	}
}

module.exports = event;