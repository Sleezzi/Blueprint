import { EmbedBuilder } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "banlist",
	permissions: "BanMembers",
	model: `banlist`,
	category: "Moderation",
	async execute(message, client) {
		try {
			await message.channel.sendTyping();
			const texts = client.translate(message.guild?.preferredLocale as string, "prefix/banlist");
			const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");

			const embed = new EmbedBuilder()
			.setAuthor({
				name: message.author.tag,
				iconURL: message.member?.user.avatarURL() as string,
				url: message.url,
			})
			.setColor(0x0099ff)
			.setTitle(`<a:ban:1205986766687965276>・${texts.title}`)
			.setFooter({
				text: `Id: ${message.id}`,
				iconURL: client.user?.avatarURL() as string,
			});
			const bans = await message.guild?.bans.fetch();
			
			for (const banInfo of bans?.map(banInfo => banInfo)!) {
				embed.addFields({
					name: `> <:nametag:1200757678104915978> \`${banInfo.user.username}\` (${banInfo.user.id})`,
					value: `> :book: ${globalsTexts.reason}: \`${banInfo.reason}\``,
					inline: true
				});
			}
			embed.setDescription(`${texts.total}: \`${bans?.size}\``);
			message.channel.send({ embeds: [embed] });
			if (message && message.deletable) message.delete();
		} catch(err) {
			console.error(err);
		}
	}
}
module.exports = command;