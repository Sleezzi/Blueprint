import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder } from "discord.js";
import { ContextMenu } from "../interfacies";

const moduleExport: ContextMenu = {
	data: new ContextMenuCommandBuilder()
	.setName("delete")
	.setNameLocalizations({
		fr: "supprimer",
		"en-US": "delete"
	})
	.setDefaultMemberPermissions(8192)
	.setType(ApplicationCommandType.Message),
	async execute(interaction, client, reply) {
		try {
			const texts = client.translate(interaction.guild?.preferredLocale as string, "contextMenu/avatar");
			const message = interaction.channel?.messages.cache.get(interaction.targetId) as any;
			if (!message) {
				const embed = new EmbedBuilder()
				.setColor(0xFF0000)
				.setAuthor({
					name: message.member?.user.username as string,
					iconURL: message?.member.user.avatarURL() as string,
					url: message.url,
				})
				.setTitle(`a:no:1211019198881472622>・${texts.noMessage}`)
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				reply({ embeds: [embed] });
				return;
			}
			if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("ManageMessages")) {
				const embed = new EmbedBuilder()
				.setColor(0xFF0000)
				.setAuthor({
					name: message.member?.user.username as string,
					iconURL: message?.member.user.avatarURL() as string,
					url: message.url,
				})
				.setTitle(`<a:no:1211019198881472622>・${texts.userMissingPerm}`)
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				reply({ embeds: [embed] });
				return;
			}
			if (!message.deletable) {
				const embed = new EmbedBuilder()
				.setColor(0xFF0000)
				.setAuthor({
					name: message.member?.user.username as string,
					iconURL: message?.member.user.avatarURL() as string,
					url: message.url,
				})
				.setTitle(`<a:no:1211019198881472622>・${texts.botMissingPerm}`)
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				reply({ embeds: [embed] });
				return;
			}
			await message.delete();
			const embed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setAuthor({
				name: message.member?.user.username as string,
				iconURL: message?.member.user.avatarURL() as string,
				url: message.url,
			})
			.setTitle(`:wastebasket:・${texts.success}`)
			.setFooter({
				text: `Id: ${message.id}`,
				iconURL: client.user?.avatarURL() as string,
			});
			reply({ embeds: [embed] });
		} catch (err) { return err; }
	}
}

module.exports = moduleExport