import { SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("say")
	.setNameLocalizations({
		fr: "dire",
		"en-US": "say"
	})
	.setDescription("Make the bot say something")
	.setDescriptionLocalizations({
		fr: "Fait dire quelque chose au bot",
		"en-US": "Make the bot say something"
	})
	.setDefaultMemberPermissions(8)
	.addStringOption(option =>
		option.setName("text")
		.setNameLocalizations({
			fr: "texte",
			"en-US": "text"
		})
		.setDescription("Text to say")
		.setDescriptionLocalizations({
			fr: "Le texte à dire",
			"en-US": "Text to say"
		})
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			if (interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("Administrator")) {
				await interaction.channel?.send({ content: interaction.options.getString("text") as string });
				reply("<a:yes:1205984539852144751>・Done.");
			} else {
				reply("<a:no:1211019198881472622>・You do not have permission to do that.");
			}
		} catch(err) { return err; }
	}
}

module.exports = commandExport;