import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder } from "discord.js";
import { ContextMenu } from "../interfacies";

const moduleExport: ContextMenu = {
	data: new ContextMenuCommandBuilder()
	.setName("userinfo")
	.setNameLocalizations({
		fr: "Information sur le membre",
		"en-US": "userinfo"
	})
	.setType(ApplicationCommandType.User),
	async execute(interaction, client, reply) {
		try {
			const member = interaction.guild?.members.cache.get(interaction.targetId);
			let roles = "The member has no role.";

			const texts = client.translate(interaction.guild?.preferredLocale as string, "contextMenu/avatar");
			const globalsTexts = client.translate(interaction.guild?.preferredLocale as string, "globals/globals");
			
			if (member?.roles.cache.toJSON().length as number > 0) {
				for (let i = 0; i < (member?.roles.cache.toJSON().length as number); i++) {
					roles = `${member?.roles.cache.toJSON().join(' ')}`;
				}
			}
			
			const embed = new EmbedBuilder()
				.setColor("Aqua")
				.setTitle(`:information:・${texts.title}`)
				.setDescription(`<@${member?.user.id}>`)
				.setThumbnail(interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.avatarURL() as string)
				.setAuthor({
					name: interaction.member?.user.username as string,
					iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.avatarURL() as string,
					url: "https://redeye.sleezzi.fr"
				})
				.addFields(
					{ name: `<:tag:1200813621970739251>・__**${globalsTexts.tag}:**__`, value: `> **\`${member?.user.tag}\`**`},
					{ name: `<:nametag:1200757678104915978>・__**${globalsTexts.nickname}:**__`, value: `> ${(member?.nickname === null ? "The member does not have a nickname." : `**\`${member?.nickname}\`**`)}`},
					{ name: `<:ID:1200784630865985598>・__**ID:**__`, value: `> \`${(member?.user.id)}\``},
					{ name: `<:member:1200816753421328484>・__**${member?.roles.cache.toJSON().length as number > 1 ? globalsTexts.roles : globalsTexts.role}:**__`, value: `> ${roles}` },
					{ name: `:inbox_tray:・__**${texts.accoundCreated}:**__`, value: `> <t:${Math.floor(member?.user.createdTimestamp as number / 1000)}:d> (<t:${Math.floor(member?.user.createdTimestamp as number / 1000)}:R>)`},
					{ name: `:inbox_tray:・__**${texts.memberSince}:**__`, value: `> <t:${Math.floor(member?.joinedTimestamp as number / 1000)}:d> (<t:${Math.floor(member?.joinedTimestamp as number / 1000)}:R>)`},
					{ name: `<:time:1205987554260684870>・__**${globalsTexts.date}:**__`, value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`},
				)
				.setURL("https://redeye.sleezzi.fr")
				.setFooter({
					text: `Id: ${interaction.id}`,
					iconURL: client.user?.avatarURL() as string
				});
			reply({ embeds: [embed] });
		} catch (err) { console.error(err); }
	}
}

module.exports = moduleExport;