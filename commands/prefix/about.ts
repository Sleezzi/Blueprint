import { EmbedBuilder, Message } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "about",
	model: `about`,
	category: "Misc",
	async execute(message, client) {
		try {
			await message.channel.sendTyping();

			const texts = client.translate(message.guild?.preferredLocale as string, "prefix/about");
			const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");

			const embed = new EmbedBuilder()
				.setColor("Aqua")
				.setTitle(`${texts.title}:`)
				.setDescription(message.guild?.description as string)
				.setThumbnail(message.guild?.iconURL() as string)
				.addFields(
					{
						name: `<:nametag:1200757678104915978> __**${texts.serverName}:**__`,
						value: `**\`${message.guild?.name}\`**`,
						inline: true
					}, // Get the name of the server
					{
						name: `:book:・__**${texts.description}:**__`,
						value: `**\`${message.guild?.description}\`**`,
						inline: true
					}, // Get the description of the server
					{
						name: `<:ID:1200784630865985598>・__**${texts.serverID}:**__`,
						value: `\`${message.guild?.id}\``,
						inline: true
					}, // Get the ID of the server
					{
						name: `<:owner:1200816888364683396>・__**${texts.serverOwner}:**__`,
						value: `${message.guild?.members.cache.find(member => member.id === message.guild?.ownerId)?.user.username} (id: ${message.guild?.ownerId})`,
						inline: true
					}, // Get the owner name & id
					{
						name: `<:member:1200816753421328484>・__**${message.guild?.members.cache.filter(member => !member.user.bot)?.size as number > 1 ? globalsTexts.members : globalsTexts.member}:**__`,
						value: `${message.guild?.members.cache.filter(member => !member.user.bot).size}`,
						inline: true
					}, // Get the number of member
					{
						name: `<:member:1200816753421328484>・__**${message.guild?.members.cache.filter(member => member.presence && member.presence.status !== "offline" && !member.user.bot).size as number > 1 ? texts.serverOnlineMembers : texts.serverOnlineMember}:**__`,
						value: `${message.guild?.members.cache.filter(member => member.presence && member.presence.status !== "offline" && !member.user.bot).size}`,
						inline: true
					}, // Get the number of online member
					{
						name: `:inbox_tray:・__**${texts.serverMembersSince}:**__`,
						value: `<t:${Math.floor(message.member?.joinedTimestamp as number / 1000)}:d> (<t:${Math.floor(message.member?.joinedTimestamp as number / 1000)}:R>)`,
						inline: true
					}, // Get when the user join the server
					{
						name: `:computer:・__**${texts.serverCreatedAt}:**__`,
						value: `<t:${Math.floor(message.guild?.createdTimestamp as number / 1000)}:d> (<t:${Math.floor(message.guild?.createdTimestamp as number / 1000)}:R>)`,
						inline: true
					}, // Get when the server has been created
					{
						name: `<:time:1205987554260684870>・__**${globalsTexts.date}:**__`,
						value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`
					}, // Get the current date
				)
				.setURL(message.url)
				.setFooter({ text: `Id: ${message.id}`, iconURL: client.user?.avatarURL() as string });
			const msg: Message = await message.channel.send({ embeds: [embed] }); // Send the message
			setTimeout(() => { // Await 25s
				try {
					if (msg.deletable) {
						msg.delete(); // Delete the message
					}
				} catch(err) { return err; }
			}, 25_000);
			if (message.deletable) message.delete();
		} catch(err) { console.error(err); }
	}
}
module.exports = command;