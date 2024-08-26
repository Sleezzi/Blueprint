import { SlashCommandBuilder } from "discord.js";
import { Database as DatabaseInterface, CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("commands")
	.setNameLocalizations({
		"en-US": "commands",
		fr: "commandes"
	})
	.setDescription("Enables/disables a command.")
	.setDescriptionLocalizations({
		"en-US": "Enables/disables a command.",
		fr: "Active/désactive une commande."
	})
	.addStringOption(option => 
		option
		.setName("command")
		.setDescription("The command")
		.setDescriptionLocalizations({
			"en-US": "The command",
			fr: "La commande"
		})
		.setRequired(true)
	)
	.addStringOption(option => 
		option
		.setName("action")
		.setDescription("Do you want to enable or disable this command?")
		.setDescriptionLocalizations({
			"en-US": "Do you want to enable or disable this command?",
			fr: "Voulez-vous activer ou désactiver cette commande ?"
		})
		.addChoices(
			{
				name: "activate",
				name_localizations: {
					"en-US": "activate",
					fr: "activer"
				},
				value: "activate"
			},
			{
				name: "deactivate",
				name_localizations: {
					"en-US": "deactivate",
					fr: "desactiver"
				},
				value: "deactivate"
			},
			{
				name: "status",
				name_localizations: {
					"en-US": "status",
					fr: "status"
				},
				value: "status"
			}
		)
		.setRequired(true)
	),
	async execute(interaction, client, reply) {
		try {
			if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("Administrator")) {
				reply(`<a:no:1211019198881472622>・<@${interaction.member?.user.id}>, you do not have the necessary permissions to use this command`);
				return;
			}
			let commands: DatabaseInterface["server"]["disabled"] = await client.database.get(`/${interaction.guild.id}/disabled`);
			if (!commands![0]) commands = [];
			if (interaction.options.getString("action") === "status") {
				reply(`The command "${interaction.options.getString("command")}" is ${commands?.find((cmd: string) => cmd === interaction.options.getString("command")) ? "disabled" : "activated"}`);
				return;
			}
			if (interaction.options.getString("action") === "activate") {
				if (commands?.find((cmd: string) => cmd === interaction.options.getString("command"))) {
					commands.splice(commands.indexOf(interaction.options.getString("command") as string), 1);
					reply(`The command "${interaction.options.getString("command")}" was activated successfully`);
				} else {
					reply(`The command "${interaction.options.getString("command")}" was not disabled`);
				}
			}
			if (interaction.options.getString("action") === "desactivate") {
				if (commands?.find((cmd: string) => cmd === interaction.options.getString("command"))) {
					reply(`The command "${interaction.options.getString("command")}" was already disabled`);
				} else {
					commands?.push(interaction.options.getString("command") as string);
					reply(`The command "${interaction.options.getString("command")}" was disabled successfully`);
				}
			}
			client.database.set(`/${interaction.guild.id}/disabled`, commands as [string]);
		} catch(err) { return err; }
	}
}

module.exports = commandExport;