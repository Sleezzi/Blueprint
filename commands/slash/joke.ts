import { SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("joke")
	.setNameLocalizations({
		"en-US": "joke",
		fr: "blague"
	})
	.setDescription("Send a joke")
	.setDescriptionLocalizations({
		"en-US": "Send a joke",
		fr: "Envoie une blague"
	})
	.addStringOption(option => 
		option.setName("type")
		.setNameLocalizations({
			"en-US": "type",
			fr: "type"
		})
		.setDescription("What type of joke")
		.setDescriptionLocalizations({
			"en-US": "What type of joke",
			fr: "Quelle type de blague ?"
		})
		.addChoices(
			{
				name: 'single',
				name_localizations: {
					"en-US": "single",
					fr: "seule"
				},
				value: 'single'
			},
			{
				name: 'twopart',
				name_localizations: {
					"en-US": "twopart",
					fr: "endepartie"
				},
				value: 'twopart'
			}
		)
		.setRequired(true)
	)
	.addStringOption(option => 
		option.setName("category")
		.setNameLocalizations({
			"en-US": "category",
			fr: "categorie"
		})
		.setDescription("What category of joke")
		.setDescriptionLocalizations({
			"en-US": "What category of joke",
			fr: "Quelle catégorie de blague ?"
		})
		.addChoices(
			{
				name: 'any',
				name_localizations: {
					"en-US": "any",
					fr: "rien"
				},
				value: "Any"
			},
			{
				name: 'programming',
				name_localizations: {
					"en-US": "programming",
					fr: "programmation"
				},
				value: 'Programming'
			},
			{
				name: 'misc',
				name_localizations: {
					"en-US": "misc",
					fr: "divers"
				},
				value: 'Miscellaneous'
			},
			{
				name: 'dark',
				name_localizations: {
					"en-US": "head",
					fr: "noir"
				},
				value: 'Dark'
			},
			{
				name: 'pun',
				name_localizations: {
					"en-US": "pun",
					fr: "jeudemot"
				},
				value: 'Pun'
			},
			{
				name: 'spooky',
				name_localizations: {
					"en-US": "spooky",
					fr: "halloween"
				},
				value: 'Spooky'
			},
			{
				name: 'christmas',
				name_localizations: {
					"en-US": "christmas",
					fr: "noel"
				},
				value: 'Christmas'
			}
		)
		.setRequired(true)
	)
	.addStringOption(option => 
		option.setName("lang")
		.setNameLocalizations({
			"en-US": "lang",
			fr: "langue"
		})
		.setDescription("The language of the joke")
		.setDescriptionLocalizations({
			"en-US": "The language of the joke",
			fr: "La langue de la blague"
		})
		.addChoices(
			{
				name: 'en',
				name_localizations: {
					"en-US": "english",
					fr: "anglais"
				},
				value: "en"
			},
			{
				name: 'french',
				name_localizations: {
					"en-US": "french",
					fr: "francais"
				},
				value: 'fr'
			},
			{
				name: 'spanish',
				name_localizations: {
					"en-US": "spanish",
					fr: "espagnol"
				},
				value: 'es'
			},
			{
				name: 'german',
				name_localizations: {
					"en-US": "german",
					fr: "allemand"
				},
				value: 'de'
			},
			{
				name: 'czech',
				name_localizations: {
					"en-US": "czech",
					fr: "theque"
				},
				value: 'cs'
			},
			{
				name: 'portuguese',
				name_localizations: {
					"en-US": "portuguese",
					fr: "portugais"
				},
				value: 'pt'
			}
		)
		.setRequired(true)
	)
	.addStringOption(option => 
		option.setName("nsfw")
		.setNameLocalizations({
			"en-US": "nsfw",
			fr: "nsfw"
		})
		.setDescription("Enabled NSFW?")
		.setDescriptionLocalizations({
			"en-US": "Enabled NSFW?",
			fr: "Activé le NSFW ?"
		})
		.addChoices(
			{
				name: 'yes',
				name_localizations: {
					"en-US": "yes",
					fr: "oui"
				},
				value: "true"
			},
			{
				name: 'no',
				name_localizations: {
					"en-US": "no",
					fr: "non"
				},
				value: 'false'
			}
		)
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			let category = interaction.options.getString('category');
			let lang = interaction.options.getString('lang');
			let type = interaction.options.getString('type');
			let nsfw = interaction.options.getString('nsfw');
			let response: any = await fetch(`https://v2.jokeapi.dev/joke/${category}?lang=${lang}&blacklistFlags=${(nsfw === "true" ? "nsfw," : "")}religious,political,racist,sexist,explicit&type=${type}`)
			if (response.status === 200) {
				response = await response.json();
				if (response.error === false) {
					if (type === "single") {
						reply(`${response.joke}` );
					} else {
						reply(`${response.setup}\n||${response.delivery}||` );
					}
				} else {
					reply(`There was an error while executing this command : ${response.causedBy[0]}` );
				}
			} else {
				reply(`There was an error while executing this command` );
			}
		} catch(err) { return err; }
	}
}

module.exports = commandExport;