import { EmbedBuilder, SlashCommandBuilder, TextChannel } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("clean")
	.setNameLocalizations({
		fr: "nettoyer",
		"en-US": "clean"
	})
	.setDescription("Delete messages in the channel in which the command is used")
	.setDescriptionLocalizations({
		fr: "Supprime tous les messages du bot sur le salon",
		"en-US": "Delete messages in the channel in which the command is used"
	})
	.setDefaultMemberPermissions(8192)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("ManageMessages")) {
			const embed: EmbedBuilder = new EmbedBuilder()
			.setColor(0xFF0000)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
				url: "https://redeye.sleezzi.fr",
			})
			.setTitle("<a:no:1211019198881472622>・You do not have permission to delete messages")
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string,
			});
			reply({ embeds: [embed] });
			return;
		}
		try {
			let messages: any = { size: 1};
			let messagesDeleted = 0;
			do {
				messages = await interaction.channel?.messages.fetch({ limit: 100 })
				.then(messages => messages.filter((msg) => msg.member?.id === client.user?.id && 1_209_600_000 > Date.now() - (msg.createdAt as any) && msg.bulkDeletable));
				try {
					await (interaction.channel as TextChannel)?.bulkDelete(messages);
				} catch(err) { return err; }
				messagesDeleted += messages.size;
			} while (messages.size >= 2);
			const embed: EmbedBuilder = new EmbedBuilder()
			.setColor(0x00FF00)
			.setTitle(`<a:trash:1213524421621448756>・**Channel content delete** (${messagesDeleted} message${(messagesDeleted > 1 ? "s" : "")})`)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
				url: "https://redeye.sleezzi.fr",
			})
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string,
			});
			reply({ embeds: [embed] });
		} catch(err) { return err; }
	}
}

module.exports = commandExport;