import { EmbedBuilder } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "ticket",
	description: "Make a new ticket (Not available)",
	model: `ticket`,
	category: "Misc",
	async execute(message, client) {
		try {
			const embed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("Ticket")
				.addFields(
					{ name: "__**<:error:1205982398429532280>:・Error:**__", value: `Sorry but the "ticket" command is only available with application commands (the / commands)`},
					{ name: "<:time:1205987554260684870>・__**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
				)
				.setURL(message.url)
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string
				});
			const msg = await message.channel.send({ embeds: [embed] });
			setInterval(() => {
				try {
					msg.delete()
				} catch (error) {
					
				}
			}, 15_000);
			if (message && message.deletable) message.delete();
		} catch(err) { console.error(err); }
	}
}
module.exports = command;