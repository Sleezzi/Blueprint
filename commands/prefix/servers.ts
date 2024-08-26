import { EmbedBuilder, Guild } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "servers",
	description: "Show you the list of guild where the bot is.",
	permissions: "Administrator",
	model: `servers`,
	category: "Moderation",
	async execute(message, client) {
		await message.channel.sendTyping();
		if (message.member?.user.id !== client.config.ownerId) {
			message.channel.send({ content: `<a:no:1211019198881472622>・<@${message.member?.id}>, you do not have the necessary permissions to use this command` });
			return;
		}
		const embed: EmbedBuilder = new EmbedBuilder()
		.setColor(0x0099ff)
		.setAuthor({
			name: message.member.user.tag,
			iconURL: message.member.user.avatarURL() as string,
			url: message.url
		})
		.setTitle('Servers list')
		.addFields(
			{ name: ":mechanical_arm:・__**Server(s):**__", value: `Total member: 0`, inline: false}
		)
		.setURL(message.url)
		.setFooter({
			text: `Id: ${message.id}`,
			iconURL: client.user?.avatarURL() as string
		});
		
		let members = 0;
		if (client.guilds.cache.map((guild) => guild.id).length > 99) {
			client.guilds.cache.map((guild) => guild).filter((guild, index: number) => index <= 99).forEach((guild: Guild, index: number) => {
				members += guild.members.cache.filter((member) => !member.user.bot).toJSON().length;
				embed.spliceFields(0, 1, { name: ":mechanical_arm:・__**Server(s):**__", value: `> **Here is the stats for:** \`${index + 1}\`\n >・Total member${(members > 1 ? "s" : "")}: \`${members}\``})
				embed.addFields({name: `${guild.name} (\`${guild.id}\`)`, value: `>・Member${(guild.members.cache.filter((member) => !member.user.bot).size > 1 ? "s" : "")}: **${guild.members.cache.filter((member) => !member.user.bot).size}**\n>・Online member${(guild.members.cache.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).size > 1 ? "s" : "")}: **${guild.members.cache.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).size}**\n>・Owner: **${guild.members.cache.find(member => member.id === guild.ownerId)?.user.username.toUpperCase()}** (\`${guild.ownerId}\`)`});
			});
		}
		message.channel.send({ embeds: [embed] });
	}
}
module.exports = command;