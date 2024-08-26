import { EmbedBuilder, Message, TextChannel } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";

const event: Event = {
	name: "MessageUpdate",
	event: "messageUpdate",
	type: "on",
	async execute([message, newMessage]: [Message, Message], client) {
		try {
			let serverData: DatabaseInterface["server"] = await client.database.get(`/${message.guild?.id}`);
			if (!serverData.prefix) serverData.prefix = client.config.prefix;
			if (newMessage.content.startsWith(serverData.prefix)) { // If the new message is a command
				require("./commandHandler").execute([newMessage], client);
				return; // End here
			};
			if (
				message.channel.type === 1 || // If the message is from DM
				!serverData.modules || // If there is no log channel
				!serverData.modules.log || // If there is no log channel
				!message.guild?.channels.cache.get(serverData.modules.log) || // If there is no log channel
				message.channel.id === serverData.modules.log || // If there is no log channel
				!message.guild?.channels.cache.find(channel => channel.id === serverData.modules?.log)?.permissionsFor(message.guild.members.cache.find(member => member.id === client.user?.id) as any)?.has("SendMessages") || // If the bot cannot send a message in the log channel
				newMessage.member?.id === client.user?.id // If the message comes from RedEye
			) return; // End here

			const texts = client.translate(message.guild?.preferredLocale as string, "events/MessageUpdate");
			const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");

			const embed = new EmbedBuilder()
			.setColor("Orange")
			.setTitle(`${texts.title}`)
			.addFields(
				{ name: `:keyboard:・__${texts.oldMessage}:__`, value: `\`\`\`\n${message.content}\n\`\`\``, inline: true},
				{ name: `:keyboard:・__${texts.newMessage}:__`, value: `\`${newMessage.content}\``, inline: true},
				{ name: `<:tag:1200813621970739251>・__${globalsTexts.channel}:__`, value: `<#${message.channelId}> \`(${message.channelId})\``},
				{ name: `<:nametag:1200757678104915978>・__${globalsTexts.author}:__`, value: `\`${newMessage.member?.user.username}\``},
				{ name: `<:time:1205987554260684870>・__${texts.dateCreated}:__`, value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
				{ name: `<:time:1205987554260684870>・__${texts.dateEdited}:__`, value: `<t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true},
			)
			.setURL(message.url)
			.setFooter({ text: `Id: ${message.id}`, iconURL: client.user?.avatarURL() as string });
			(message.guild?.channels.cache.get(serverData.modules.log) as TextChannel).send({ embeds: [embed]}); // Send the log message in the logs channel
		} catch (err) { console.error(err); }
	}
}
module.exports = event;