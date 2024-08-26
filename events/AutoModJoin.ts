import { EmbedBuilder, Guild, GuildMember, TextChannel } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";
import { readFileSync } from "fs";

const event: Event = {
	name: "AutoModMember",
	event: "guildMemberAdd", // When a member join the server
	type: "on",
	async execute([member]: [GuildMember], client) {
		try {
			if (member.user.bot || // If the member is a bot
				!member.manageable || // If the member cannot be managed by the bot
				!member.moderatable // If the member cannot be moderated by the bot
			) return; // End here
			const automod: DatabaseInterface["server"]["modules"]["automod"] = await client.database.get(`/${member.guild?.id}/modules/automod`); // Retrieves data from server
			
			let messageModerated = member.user.username.toLowerCase();
			
			if (automod.defaultList) {
				const list = JSON.parse(readFileSync("./automod.json", "utf8"));
				for (const word of list) {
					const regex = new RegExp(word, "g")
					if (regex.test(messageModerated.replace(/\*word deleted\*/g, ""))) {
						messageModerated = messageModerated.replace(regex, "*word deleted*");
					}
				}
			}
			
			if (automod.words && automod.words[0]) {
				for (const word of automod.words) {
					const regex = new RegExp(word, "g")
					if (regex.test(messageModerated.replace(/\*/g, ""))) {
						messageModerated = messageModerated.replace(regex, "*");
					}
				}
			}
			
			if (messageModerated !== member.user.username.toLowerCase()) {
				await member.setNickname(messageModerated, "Invalid name");
				const log: DatabaseInterface["server"]["modules"]["log"] = await client.database.get(`/${member.guild?.id}/modules/log`); // Retrieves data from server
				
				if (
					log && // If there is no log channel
					member.guild?.channels.cache.find(channel => channel.id === log) && // If the show does not exist/no longer exists
					member.guild?.channels.cache.get(log)?.permissionsFor(member.guild.members.cache.get(client.user?.id as string) as any)?.has("SendMessages") // If the bot cannot send a message in the log channel
				) {
					const texts = client.translate(member.guild?.preferredLocale as string, `events/AutomodJoin`);
					const globalsTexts = client.translate(member.guild?.preferredLocale as string, `globals/globals`);
					const embed = new EmbedBuilder()
					.setColor("Red")
					.setTitle(texts.title)
					.setAuthor({ name: member.user.username, iconURL: member.avatarURL() as string, url: "https://redeye.sleezzi.fr" })
					.addFields(
						{ name: `<:time:1205987554260684870>・__${globalsTexts.reason}:__`, value: `${texts.reason}` },
						{ name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`, value: `<t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)` },
					)
					.setURL("https://redeye.sleezzi.fr")
					.setFooter({ text: `Id: ${member.id}`, iconURL: client.user?.avatarURL() as string });
					(member.guild?.channels.cache.get(log) as TextChannel).send({ embeds: [embed] });
				};
			}
		} catch (err) { console.error(err); }
	}
}

module.exports = event;