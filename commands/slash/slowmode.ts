import { ChannelType, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("slowmode")
	.setNameLocalizations({
		"en-US": "slowmode",
		fr: "modelent"
	})
	.setDescription("Gives you information about the server")
	.setDescriptionLocalizations({
		"en-US": "Activate slow mode on this channel",
		fr: "Active le mode lent sur ce salon"
	})
	.addNumberOption(option => option
		.setName("time")
		.setNameLocalizations({
			"en-US": "time",
			fr: "temps"
		})
		.setDescription("The time between each message (in seconds), set to 0 to deactivate")
		.setDescriptionLocalizations({
			"en-US": "The time between each message (in seconds), set to 0 to deactivate",
			fr: "Le temps entre chaques message (en secondes), mettez 0 pour désactiver"
		})
		.setMinValue(0)
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			if (interaction.channel?.type !== ChannelType.GuildText) return;
			await interaction.channel.setRateLimitPerUser(interaction.options.getNumber("time")!);
			reply("Done!");
		} catch(err) { return err; }
	}
}

module.exports = commandExport;