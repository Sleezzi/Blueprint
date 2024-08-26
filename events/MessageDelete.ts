import { EmbedBuilder, Message, TextChannel } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";

const event: Event = {
	name: "MessageDelete",
	event: "messageDelete",
	type: "on",
	async execute([message]: [Message], client) {
		try {
			let id: DatabaseInterface["server"]["modules"]["log"] = await client.database.get(`/${message.guild?.id}/modules/log`); // Retrieves data from server
			
			if (
				message.channel.type === 1 || // If the message is from DM
				!id || // If there is no log channel
				!message.guild?.channels.cache.get(id) || // If the show does not exist/no longer exists
				message.channel.id === id || // If the message comes from the log channel
				!message.guild?.channels.cache.get(id)?.permissionsFor(message.guild.members.cache.get(client.user?.id as string) as any)?.has("SendMessages") || // If the bot cannot send a message in the log channel
				message.member?.id === client.user?.id // If the message comes from RedEye
			) return; // End here

			const texts = client.translate(message.guild?.preferredLocale as string, "events/MessageDelete");
			const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");
			const embed = new EmbedBuilder()
			.setColor("Red")
			.setTitle(`${texts.title}`)
			.setAuthor({ name: message.member?.user.username || "Invalid user", iconURL: message.member?.user.avatarURL() as string, url: message.url })
			.addFields(
				{ name: `:keyboard:・__${globalsTexts.message}:__`, value: `**\`\`\`\n${message.content}\n\`\`\`**` },
				{ name: `<:tag:1200813621970739251>・__${globalsTexts.channel}:__`, value: `<#${message.channelId}> \`(${message.channelId})\``},
				{ name: `<:nametag:1200757678104915978>・__${globalsTexts.author}:__`, value: `**\`${message.member?.user.tag}\`** \`(${message.member?.id})\``},
				{ name: `<:time:1205987554260684870>・__${texts.dateCreated}:__`, value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
				{ name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`, value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)` },
			)
			.setURL(message.url)
			.setFooter({ text: `Id: ${message.id}`, iconURL: client.user?.avatarURL() as string });
			(message.guild?.channels.cache.get(id) as TextChannel).send({ embeds: [embed]}); // Send the log message in the logs channel
		} catch (err) { console.error(err); }
	}
}
module.exports = event;