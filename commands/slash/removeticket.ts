import { SlashCommandBuilder } from "discord.js";
import { CommandSlash, Database as DatabaseInterface } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("removeticket")
	.setNameLocalizations({
		"en-US": "supprimerticket",
		fr: "removeticket"
	})
	.setDescription("Remove a  ticket")
	.setDescriptionLocalizations({
		"en-US": "Remove a ticket",
		fr: "Supprime un ticket"
	})
	.addStringOption(option =>
		option.setName("id")
		.setNameLocalizations({
			fr: "id",
			"en-US": "id"
		})
		.setDescription("The ticket's id")
		.setDescriptionLocalizations({
			fr: "L'id du ticket",
			"en-US": "The ticket's id"
		})
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			const ticket: DatabaseInterface["server"]["tickets"]["user"]["id"] = await client.database.get(`/${interaction.guild?.id}/tickets/${interaction.member?.user.id}/${interaction.options.getString("id")}`);
			if (ticket.content) {
				await client.database.delete(`/${interaction.guild?.id}/tickets/${interaction.member?.user.id}/${interaction.options.getString("id")}`);
				reply(`This ticket has been removed`);
			} else {
				reply(`You can't remove this ticket`);
			}
		} catch(err) { return err; }
	}
}

module.exports = commandExport;