import { EmbedBuilder, GuildMember, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("about")
	.setNameLocalizations({
		"en-US": "about",
		fr: "info"
	})
	.setDescription("Gives you information about the server")
	.setDescriptionLocalizations({
		"en-US": "Gives you information about the server",
		fr: "Donne des informations sur le serveur"
	})
	.setNSFW(false),
	servers: "All",
	async execute(interaction, client, reply) {
		try {
			const embed = new EmbedBuilder()
				.setColor("Aqua")
				.setTitle(":information:・Server Information:")
				.setDescription(interaction.guild?.description as string)
				.setThumbnail(interaction.guild?.iconURL() as string)
				.addFields(
					{ name: "<:nametag:1200757678104915978> __**Server name:**__", value: `**\`${interaction.guild?.name}\`**`, inline: true},
					{ name: ":book:・__**Server description:**__", value: `**\`${interaction.guild?.description}\`**`, inline: true},
					{ name: "<:ID:1200784630865985598>・__**ID:**__", value: `\`${interaction.guild?.id}\``, inline: true},
					{ name: "<:owner:1200816888364683396>・__**Owner:**__", value: `${interaction.guild?.members.cache.find(member => member.id === interaction.guild?.ownerId)?.user.username} (id: ${interaction.guild?.ownerId})`, inline: true},
					{ name: `<:member:1200816753421328484>・__**Member${interaction.guild?.members.cache.filter(member => !member.user.bot)?.size as number > 1 ? "s" : ""}:**__`, value: `${interaction.guild?.members.cache.filter(member => !member.user.bot).size}`, inline: true},
					{ name: `<:member:1200816753421328484>・__**Onlone Member${interaction.guild?.members.cache.filter((member: GuildMember) => member.presence && member.presence.status !== "offline" && !member.user.bot)?.size as number > 1 ? "s" : ""}:**__`, value: `${interaction.guild?.members.cache.filter(member => member.presence && member.presence.status !== "offline" && !member.user.bot).size}`, inline: true},
					{ name: ":inbox_tray:・__**You have been a member since:**__", value: `<t:${Math.floor(interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.joinedTimestamp as number / 1000)}:d> (<t:${Math.floor(interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.joinedTimestamp as any / 1000)}:R>)`, inline: true},
					{ name: ":computer:・__**Server created:**__", value: `<t:${Math.floor(interaction.guild?.createdTimestamp as any / 1000)}:d> (<t:${Math.floor(interaction.guild?.createdTimestamp as number / 1000)}:R>)`, inline: true},
					{ name: "<:time:1205987554260684870>・__**Date:**__", value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`},
				)
				.setURL("https://redeye.sleezzi.fr")
				.setFooter({ text: `Id: ${interaction.id}`, iconURL: client.user?.avatarURL() as string });
			reply({ embeds: [embed] });
		} catch(err) { return err; }
	}
}

module.exports = commandExport;