import { SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("headortail")
	.setNameLocalizations({
		"en-US": "headortail",
		fr: "pileouface"
	})
	.setDescription("Toss head or tail")
	.setDescriptionLocalizations({
		"en-US": "Toss head or tail",
		fr: "Joue a pile ou face"
	})
	.addStringOption(option => 
		option.setName("chosen")
		.setNameLocalizations({
			"en-US": "chosen",
			fr: "choisie"
		})
		.setDescription("Choose your face")
		.setDescriptionLocalizations({
			"en-US": "Choose your face",
			fr: "Choisie ta face"
		})
		.addChoices(
			{
				name: 'none',
				name_localizations: {
					"en-US": "none",
					fr: "rien"
				},
				value: "none"
			},
			{
				name: 'Choose tail',
				name_localizations: {
					"en-US": "tail",
					fr: "pile"
				},
				value: 'tail'
			},
			{
				name: 'Choose head',
				name_localizations: {
					"en-US": "head",
					fr: "face"
				},
				value: 'head'
			}
		)
		.setRequired(false)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			let face = interaction.options.getString("chosen");
			
			const result = Math.random() < 0.5 ? 'tail' : 'head';
			if (face !== "none") {
				if (face !== "head" && face !== "tail") {
					reply('The face chosen is not good.' );
					return;
				}
				if (result === face) {
					const msg = await reply("You won" );
					setTimeout(() => {
						try {
							msg?.delete();
						} catch (err) {
							return err;
						}
					}, 5000);
				} else {
					const msg = await reply("You lost" );
					setTimeout(() => {
						try {
							msg?.delete();
						} catch (err) {
							return err;
						}
					}, 5000);
				}
			} else {
				const msg = await reply(`It's falling on \`${result}\`` );
				setTimeout(() => {
					try {
						msg?.delete();
					} catch (err) {
						return err;
					}
				}, 5000);
			}
		} catch(err) { return err; }
	}
}

module.exports = commandExport;