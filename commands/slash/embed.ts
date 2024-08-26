import { ActionRowBuilder, ModalActionRowComponentBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("embed")
	.setNameLocalizations({
		"en-US": "embed",
		fr: "embed"
	})
	.setDescription("Allows you to create an embed")
	.setDescriptionLocalizations({
		"en-US": "Allows you to create an embed",
		fr: "Vous permet de créer un embed"
	})
	.setNSFW(false),
	loadingMessage: false,
	async execute(interaction, client, reply) {
		try {
			if (!interaction.guild?.channels.cache.get(interaction.channel?.id as string)?.permissionsFor(interaction.member?.user.id as string)?.has("AttachFiles")) {
				interaction.reply({ content: `<a:no:1211019198881472622>・You do not have permission to send embeds to this channel.`, ephemeral: true });
				return;
			}
			const title = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				new TextInputBuilder()
				.setCustomId("title")
				.setLabel("Title")
				.setMaxLength(256)
				.setRequired(false)
				.setStyle(TextInputStyle.Short)
			);
			
			const description = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				new TextInputBuilder()
				.setCustomId("description")
				.setLabel("Description")
				.setMaxLength(4000)
				.setRequired(false)
				.setStyle(TextInputStyle.Paragraph)
			);
			
			const image = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				new TextInputBuilder()
				.setCustomId("image")
				.setLabel("Image")
				.setMinLength(8)
				.setRequired(false)
				.setStyle(TextInputStyle.Short)
			);
			
			const color = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				new TextInputBuilder()
				.setCustomId("color")
				.setLabel("Color")
				.setMinLength(7)
				.setMaxLength(9)
				.setValue("#FF0000")
				.setRequired(false)
				.setStyle(TextInputStyle.Short)
			);
			
			const channel = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				new TextInputBuilder()
				.setCustomId("channel")
				.setLabel("Channel Id")
				.setRequired(true)
				.setValue(interaction.channel?.id as string)
				.setStyle(TextInputStyle.Short)
			);
			
			const modal = new ModalBuilder()
			.setTitle("Embed")
			.setCustomId("embedbuilder")
			.addComponents()
			.addComponents(
				title,
				description,
				image,
				color,
				channel
			);
			
			interaction.showModal(modal);
		} catch(err) { return err; }
	}
}

module.exports = commandExport;