import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("guild")
	.setNameLocalizations({
		"en-US": "guild",
		fr: "servers"
	})
	.setDescription("Shows you the list of servers the bot is on")
	.setDescriptionLocalizations({
		"en-US": "Shows you the list of servers the bot is on",
		fr: "Vous montre la liste des serveurs sur lesquels le bot est"
	})
	.setDefaultMemberPermissions(8)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			if (interaction.member?.user.id !== client.config.ownerId) {
				reply(`<a:no:1211019198881472622>・<@${interaction.member?.user.id}>, you do not have the necessary permissions to use this command`);
				return;
			}
			const embed = new EmbedBuilder()
			.setColor(0x0099ff)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
				url: "https://redeye.sleezzi.fr"
			})
			.setTitle('Servers list')
			.addFields(
				{
					name: ":mechanical_arm:・__**Server(s):**__",
					value: `Total member: 0\nTotal member online: 0`,
					inline: false
				}
			)
			.setURL("https://redeye.sleezzi.fr")
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string
			});
			
			let members = 0;
			let onlineMembers = 0;
			if (client.guilds.cache.toJSON().length >= 25) {
				client.guilds.cache.toJSON().filter((guild, index) => index <= 25).forEach((guild, index) => {
					const guildMembers = guild.members.cache.toJSON();
					members += guildMembers.filter((member) => !member.user.bot).length;
					onlineMembers += guildMembers.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).length;
					
					embed.spliceFields(0, 1, {
						name: ":mechanical_arm:・__**Server(s):**__",
						value: `> **Here is the stats for:** \`${index + 1}, missing ${index+1 >= 25 ? 0 : 25 - index+1} server${(index+1 >= 25 ? 0 : 25 - index+1) > 1 ? "s" : ""}\`\n >・Total member${(members > 1 ? "s" : "")}: \`${members}\`\n>・Total online member${onlineMembers > 1 ? "s" : ""}: \`${onlineMembers}\``,
						inline: false
					});
					
					embed.addFields({
						name: `${guild.name} (\`${guild.id}\`)`,
						value: `>・Member${(guildMembers.filter((member) => !member.user.bot).length > 1 ? "s" : "")}: **${guildMembers.filter((member) => !member.user.bot).length}**\n>・Online member${(guildMembers.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).length > 1 ? "s" : "")}: **${guildMembers.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).length}**\n>・Owner: **${guildMembers.find(member => member.id === guild.ownerId)?.user.username.toUpperCase()}** (\`${guild.ownerId}\`)`
					});
				});
			} else {
				client.guilds.cache.toJSON().forEach((guild, index) => {
					const guildMembers = guild.members.cache.toJSON();
					members += guildMembers.filter((member) => !member.user.bot).length;
					onlineMembers += guildMembers.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).length;
					
					embed.spliceFields(0, 1, {
						name: ":mechanical_arm:・__**Server(s):**__",
						value: `>・Total server${index + 1 > 1 ? "s" : ""}: \`${client.guilds.cache.toJSON().map(server => server.id).length}\`\n>・Total member${(members > 1 ? "s" : "")}: \`${members}\`\n>・Total online member${onlineMembers > 1 ? "s" : ""}: \`${onlineMembers}\``,
						inline: false
					});
					embed.addFields({
						name: `${guild.name} (\`${guild.id}\`)`,
						value: `>・Member${index + 1 > 1 ? "s" : ""}: **${guildMembers.filter((member) => !member.user.bot).length}**\n>・Online member${(guildMembers.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).length > 1 ? "s" : "")}: **${guildMembers.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).length}**\n>・Owner: **${guildMembers.find(member => member.id === guild.ownerId)?.user.username.toUpperCase()}** (\`${guild.ownerId}\`)`
					});
				});
			}
			reply({ embeds: [embed] });
		} catch (err) { return err; }
	}
}

module.exports = commandExport;