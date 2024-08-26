import { SlashCommandBuilder } from "discord.js";
import { Database as DatabaseInterface, CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("removebannedword")
	.setNameLocalizations({
		"en-US": "removebannedword",
		fr: "retirermotbanni"
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
	),
	async execute(interaction, client, reply) {
		try {
			if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("ModerateMembers")) {
				reply(`<a:no:1211019198881472622>・<@${interaction.member?.user.id}>, you do not have the necessary permissions to use this command` );
				return;
			}
			let words: DatabaseInterface["server"]["modules"]["automod"]["words"] = await client.database.get(`/${interaction.guild.id}/modules/automod/words`);
			if (!words![0]) words = [];
			if (!words?.find((word: string) => word === interaction.options.getString("word")?.toLowerCase())) {
				reply("The word does not exist :/");
				return;
			}
			
			words?.splice(words?.findIndex((word: string) => word === interaction.options.getString("word")?.toLowerCase()), 1);
			client.database.set(`/${interaction.guild.id}/modules/automod/words`, words);
			reply(`Addition made. The word ${interaction.options.getString("word")} is now in the filter list!` );
		} catch(err) { return err; }
	}
}

module.exports = commandExport;