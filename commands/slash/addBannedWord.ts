import { SlashCommandBuilder } from "discord.js";
import { CommandSlash, Database as DatabaseInterface } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("addbannedword")
	.setNameLocalizations({
		"en-US": "addbannedword",
		fr: "ajoutermotbanni"
	})
	.setDescription("Adds a word to the word filter.")
	.setDescriptionLocalizations({
		"en-US": "Adds a word to the word filter.",
		fr: "Ajoute un mot au filtre de mot."
	})
	.addStringOption(option => 
		option
		.setName("word")
		.setDescription("The word to add in the filter")
		.setDescriptionLocalizations({
			"en-US": "The word to add in the filter",
			fr: "Le mot à ajouter au filtre"
		})
		.setRequired(true)
	)
	.addBooleanOption(option => 
		option
		.setName("regex")
		.setDescription("Is the word a regex?")
		.setDescriptionLocalizations({
			"en-US": "Is the word a regex? If you don't know what it is, set false",
			fr: "Le mot est-il un regex ? Si vous ne savez pas ce que c'est mettez false"
		})
		.setRequired(true)
	),
	async execute(interaction, client, reply) {
		try {
			if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("ModerateMembers")) {
				reply(`<a:no:1211019198881472622>・<@${interaction.member?.user.id}>, you do not have the necessary permissions to use this command`);
				return;
			}
			let words: DatabaseInterface["server"]["modules"]["automod"]["words"] = await client.database.get(`/${interaction.guild.id}/modules/automod/words`);
			if (!words![0]) words = [];
			if (interaction.options.getBoolean("regex")) {
				if (words?.find((word: string) => word === interaction.options.getString("word")?.replace(/\\/g, "\\\\"))) {
					reply("The word is already in the list");
					return;
				}
				words?.push(interaction.options.getString("word")?.replace(/\\/g, "\\\\") as string);
			} else {
				if (words?.find(word => word === interaction.options.getString("word")
					?.replace(/\./g, "\\.")
					.replace(/\*/g, "\\*")
					.replace(/\*/g, "\\*")
					.replace(/\\/g, "\\\\")
					.replace(/\?/g, "\\?")
					.replace(/\(/g, "\\(")
					.replace(/\)/g, "\\)")
					.replace(/\[/g, "\\[")
					.replace(/\]/g, "\\]")
					.replace(/\|/g, "\\|")
					.replace(/\^/g, "\\^"))) {
					reply("The word is already in the list");
					return;
				}
				words?.push(
					interaction.options.getString("word")
					?.replace(/\./g, "\\.")
					.replace(/\*/g, "\\*")
					.replace(/\*/g, "\\*")
					.replace(/\\/g, "\\\\")
					.replace(/\?/g, "\\?")
					.replace(/\(/g, "\\(")
					.replace(/\)/g, "\\)")
					.replace(/\[/g, "\\[")
					.replace(/\]/g, "\\]")
					.replace(/\|/g, "\\|")
					.replace(/\^/g, "\\^") as string
				);
			}
			
			client.database.set(`/${interaction.guild.id}/modules/automod/words`, words as [string]);
			reply(`Addition made. The word **${interaction.options.getString("word")}** is now in the filter list!`);
		} catch(err) { return err; }
	}
}

module.exports = commandExport;