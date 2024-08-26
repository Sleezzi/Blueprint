import { EmbedBuilder, Message, TextChannel } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";

const event: Event = {
	name: "NewMessage",
	event: "messageCreate", // When a message is posted
	type: "on",
	async execute([message]: [Message], client) {
		try {
			if (message.channel.type === 1 || // If the is from DM
				message.author.bot // If the message is from a bot
			) return; // End here
			let serverData: DatabaseInterface["server"] = await client.database.get(`/${message.guild?.id}`); // Retrieves data from server
			
			const texts = client.translate(message.guild?.preferredLocale as string, "events/MessageCreate");
			const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");

			if (!serverData.prefix) serverData.prefix = client.config.prefix; // Sets the default prefix
			if (message.content.startsWith(serverData.prefix) || // If the message starts with the prefix
				!serverData.modules || // If there is no log channel
				!serverData.modules.log || // If there is no log channel
				!message.guild?.channels.cache.get(serverData.modules.log) || // If the show does not exist/no longer exists
				!message.guild?.channels.cache.get(serverData.modules.log)?.permissionsFor(message.guild.members.cache.find(member => member.id === client.user?.id) as any)?.has("SendMessages") || // If the bot cannot send a message in the log channel
				message.member?.id === client.user?.id // If the message comes from RedEye
			) return;
			const embed = new EmbedBuilder()
				.setColor("Green")
				.setTitle(`${texts.title}`)
				.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() as string, url: message.url })
				.addFields(
					{ name: `:keyboard:・__${globalsTexts.message}:__`, value: `**\`\`\`\n${message.content}\n\`\`\`**` },
					{ name: `<:tag:1200813621970739251>・__${globalsTexts.channel}:__`, value: `<#${message.channelId}> \`(${message.channelId})\``},
					{ name: `<:nametag:1200757678104915978>・__${globalsTexts.author}:__`, value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
					{ name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`, value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)` },
				)
				.setURL(message.url)
				.setFooter({ text: `Id: ${message.id}`, iconURL: client.user?.avatarURL() as string });
			(message.guild.channels.cache.get(serverData.modules.log) as TextChannel).send({ embeds: [embed]}); // Send the log message in the logs channel
		} catch (err) { console.error(err); }
	}
}
module.exports = event;