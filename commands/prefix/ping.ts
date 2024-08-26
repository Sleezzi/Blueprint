import { EmbedBuilder } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "ping",
	description: "Gives information about the server",
	model: `ping`,
	category: "Misc",
	async execute(message, client) {
		try {
			const APIPing = Date.now() - message.createdTimestamp;
			let embed: EmbedBuilder = new EmbedBuilder()
			.setColor(0x00FFFF)
			.setAuthor({
					name: message.author.tag,
					iconURL: message.member?.user.avatarURL() as string,
					url: message.url,
				})
			.setTitle(":wireless:・Latency:")
			.addFields(
				{ name: "<:time:1205987554260684870>・__**The ping of Discord API:**__", value: `**\`${APIPing}ms\`**`, inline: true },
				{ name: "<:time:1205987554260684870>・__**The ping of Bot:**__", value: `**\`${client.ws.ping}ms\`**`, inline: true }
			)
			.setFooter({
				text: `Id: ${message.id}`,
				iconURL: client.user?.avatarURL() as string
			});
			const msg = await message.channel.send({ embeds: [embed] });
			setTimeout(() => {
				try {
					msg.delete();
				} catch (err) {
					console.error(err);
				}
			}, 10_000);
			if (message && message.deletable) message.delete();
		} catch(err) { console.error(err); }
	}
}
module.exports = command;