import { EmbedBuilder, MessageReaction, PartialMessageReaction, PartialUser, TextChannel, User } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";

const event: Event = {
	name: "Reaction Add",
	event: "messageReactionAdd", // Send a log message in the console when the bot shutdown
	type: "on",
	async execute([reaction, user]: [MessageReaction | PartialMessageReaction, User | PartialUser], client) {
		try {
			const id: DatabaseInterface["server"]["modules"]["log"] = await client.database.get(`/${reaction.message.guild?.id}/modules/log`); // Retrieve the room ID from the database
			if (
				typeof id === "object" || // If there is none
				!reaction.message.guild?.channels.cache.has(id) || // If the channel does not exist/no longer exists
				!reaction.message.guild?.channels.cache
				.filter(channel => channel.permissionsFor(reaction.message.guild?.members.cache.find(member => member.id === client.user?.id)!)?.has("SendMessages")) // If the bot can't send messages in this channel
				.has(id) // If the channel does not exist/no longer exists
			) return; // End here

			const texts = client.translate(reaction.message.guild?.preferredLocale as string, `events/reactionAdd`);
			const globalsTexts = client.translate(reaction.message.guild?.preferredLocale as string, `globals/globals`);
			
			const embed = new EmbedBuilder()
			.setColor("Green")
			.setTitle(`${texts.title}`)
			.addFields(
				{ name: `<:nametag:1200757678104915978>・__${globalsTexts.emoji}:__`, value: `\`${reaction.emoji}\`` },
				{ name: `<:member:1200816753421328484>・__${texts.messageAuthor}:__`, value: `${reaction.message.member?.user.username} (*${reaction.message.member?.user.id}*)` },
				{ name: `<:member:1200816753421328484>・__${texts.reactionCount}:__`, value: `${reaction.count}` },
				{ name: `:envelope_with_arrow:・__${globalsTexts.message}:__`, value: `${reaction.message.content} <#${reaction.message.channel.id}> (*${reaction.message.id}*)` },
				{ name: `<:member:1200816753421328484>・__${texts.user}:__`, value: `${user.username} (*${user.id}*)` },
				{ name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`, value: `<t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true },
			)
			.setFooter({ text: `Id: ${reaction.message.id}`, iconURL: client.user?.avatarURL() as string });
			(reaction.message.guild.channels.cache.get(id) as TextChannel)?.send({ embeds: [embed] }); // Send the message in log channel
		} catch (err) { console.error(err); }
	}
}
module.exports = event