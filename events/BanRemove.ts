import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";

const event: Event = {
	name: "Unban",
	event: "guildBanRemove", // When a user is unbanned
	type: "on",
	async execute([member]: [GuildMember], client) {
		try {
			let id: DatabaseInterface["server"]["modules"]["log"] = await client.database.get(`/${member.guild?.id}/modules/log`); // Retrieves data from server
			
			if (
				!id || // If there is no log channel
				!member.guild?.channels.cache.get(id) || // If the show does not exist/no longer exists
				!member.guild?.channels.cache.get(id)?.permissionsFor(member.guild.members.cache.get(client.user?.id as string) as any)?.has("SendMessages") // If the bot cannot send a message in the log channel
			) return; // End here
			
			const texts = client.translate(member.guild?.preferredLocale as string, `events/BanRemove`);
			const globalsTexts = client.translate(member.guild?.preferredLocale as string, `globals/globals`);

			const embed = new EmbedBuilder()
			.setColor("Green")
			.setTitle(texts.title)
			.setAuthor({ name: member.user.username, iconURL: member.avatarURL() as string, url: "https://redeye.sleezzi.fr" })
			.addFields(
				{ name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`, value: `<t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)` },
			)
			.setURL("https://redeye.sleezzi.fr")
			.setFooter({ text: `Id: ${member.id}`, iconURL: client.user?.avatarURL() as string });
			(member.guild?.channels.cache.get(id) as TextChannel).send({ embeds: [embed]}); // Send the log message in the logs channel
		} catch (err) { console.error(err); }
	}
}
module.exports = event;