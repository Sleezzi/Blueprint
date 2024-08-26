import { SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("mix")
	.setNameLocalizations({
		"en-US": "mix",
		fr: "mix"
	})
	.setDescription("Mix 2 words to form a new one")
	.setDescriptionLocalizations({
		"en-US": "Mix 2 words to form a new one",
		fr: "Mélange 2 mots pour en former un nouveau"
	})
	.addStringOption(option =>
		option.setName("firstword")
		.setNameLocalizations({
					fr: "premiermot",
					"en-US": "firstword"
				})
		.setDescription("The first word to mix")
		.setDescriptionLocalizations({
					fr: "Le premier mot a mélanger",
					"en-US": "The first word to mix"
				})
		.setRequired(true)
	)
	.addStringOption(option =>
		option.setName("secondword")
		.setNameLocalizations({
			fr: "secondmot",
			"en-US": "secondword"
		})
		.setDescription("The second word to mix")
		.setDescriptionLocalizations({
			fr: "Le second mot a supprimer",
			"en-US": "The second word to mix"
		})
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			const letters: [] = interaction.options.getString("firstword")?.split("").concat((interaction.options.getString("secondword") as string).split("")) as any;
			for (let i = letters.length - 1; i > 0; i--) {
				const random = Math.floor(Math.random() * (i + 1));
				[letters[i], letters[random]] = [letters[random], letters[i]];
			}
			reply(`\`${interaction.options.getString("firstword")}\` + \`${interaction.options.getString("secondword")}\` = **${letters.join("")}**` );
		} catch (err) { return err; }
	}
}

module.exports = commandExport;