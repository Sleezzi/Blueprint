import { ActionRowBuilder, ModalActionRowComponentBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { CommandSlash, Database as DatabaseInterface } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
		.setName("editticket")
		.setNameLocalizations({
			"en-US": "editticket",
			fr: "editticket"
		})
		.setDescription("Edit a ticket")
		.setDescriptionLocalizations({
			"en-US": "Edit a ticket",
			fr: "Bannie un membre du serveur"
		})
		.setNSFW(false),
	loadingMessage: false,
	async execute(interaction, client, reply) {
		try {
			const tickets: DatabaseInterface["server"]["tickets"]["user"] = await client.database.get(`/${interaction.guild?.id}/tickets/${interaction.member?.user.id}`);
			if (Object.keys(tickets).length >= 15 && interaction.member?.user.id !== client.config.ownerId) {
				interaction.reply({ content: `<a:no:1211019198881472622>・Sorry but you have reached the maximum ticket limit`, ephemeral: true });
				return;
			}
			const id = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				new TextInputBuilder()
				.setCustomId("id")
				.setLabel("ID")
				.setMinLength(36)
				.setMaxLength(36)
				.setRequired(true)
				.setStyle(TextInputStyle.Short)
			);
			const category = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				new TextInputBuilder()
				.setCustomId("category")
				.setLabel("Category")
				.setValue(interaction.options.getString("category") as string)
				.setRequired(true)
				.setStyle(TextInputStyle.Short)
			);
			const content = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				new TextInputBuilder()
				.setCustomId("content")
				.setLabel("Content")
				.setMaxLength(1000)
				.setRequired(true)
				.setStyle(TextInputStyle.Paragraph)
			);
			const modal = new ModalBuilder()
			.setTitle("Embed")
			.setCustomId("newTicket")
			.addComponents()
			.addComponents(
				id,
				category,
				content,
			);
			interaction.showModal(modal);
		} catch(err) { return err; }
	}
}

module.exports = commandExport;