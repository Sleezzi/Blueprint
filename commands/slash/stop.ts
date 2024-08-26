import { SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("stop")
	.setNameLocalizations({
		"en-US": "stop",
		fr: "arret"
	})
	.setDescription("Stop the bot")
	.setDescriptionLocalizations({
		"en-US": "Stop the bot",
		fr: "Arrête le bot"
	})
	.setDefaultMemberPermissions(8)
	.setNSFW(false),
	servers: "Owner",
	async execute(interaction, client, reply) {
		if (interaction.member?.user.id === client.config.ownerId) {
			client.kill(client.config.token, true);
		} else {
			reply(`<a:no:1211019198881472622>・<@${interaction.member?.user.id}>, you do not have the necessary permissions to use this command` );
		}
	}
}

module.exports = commandExport;