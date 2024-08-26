import { SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("leave")
	.setNameLocalizations({
			"en-US": "leave",
			fr: "quitter"
		})
	.setDescription("Make the bot leave a guild")
	.setDescriptionLocalizations({
			"en-US": "Make the bot leave a guild",
			fr: "Fait quitter le bot d'un server"
		})
	.setDefaultMemberPermissions(8)
	.addStringOption(option =>
		option.setName("id")
		.setNameLocalizations({
					fr: "id",
					"en-US": "id"
				})
		.setDescription("The id of the guild")
		.setDescriptionLocalizations({
					fr: "The id of the guild",
					"en-US": "L'id du serveur"
				})
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		if (interaction.member?.user.id === client.config.ownerId) {
			if (!interaction.options.getString("id")) {
				reply(`Please enter a good id` );
				return;
			}
			if (!client.guilds.cache.has(interaction.options.getString("id") as string) || interaction.guild?.id === interaction.options.getString("id")) {
				await interaction.deleteReply();
				reply(`Please enter a good id` );
				return;
			}
			await client.guilds.cache.get(interaction.options.getString("id") as string)?.leave();
			await interaction.deleteReply();
			reply(`The bot left server **${interaction.options.getString("id")}**` );
		} else {
			await interaction.deleteReply();
			reply(`<a:no:1211019198881472622>・<@${interaction.member?.user.id}>, you do not have the necessary permissions to use this command` );
		}
	}
}

module.exports = commandExport;