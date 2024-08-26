import { EmbedBuilder, ForumChannel, VoiceChannel, TextChannel, GuildMember } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";

const event: Event = {
	name: "ChannelDelete",
	event: "channelDelete", // When a channel is deleted
	type: "on",
	async execute([channel]: [TextChannel | ForumChannel | VoiceChannel | any], client) {
		try {
			const id: DatabaseInterface["server"]["modules"]["log"] = await client.database.get(`/${channel.guild.id}/modules/log`); // Retrieve the room ID from the database
			if (
				typeof id === "object" || // If there is none
				!channel.guild.channels.cache.has(id) || // If the channel does not exist/no longer exists
				!channel.guild.channels.cache.get(id).permissionsFor(channel.guild.members.cache.find((member: GuildMember) => member.id === client.user?.id)).has("SendMessages") // If the bot can't send messages in this channel
			) return; // End here

			const texts = client.translate(channel.guild?.preferredLocale as string, `events/ChannelDelete`);
			const globalsTexts = client.translate(channel.guild?.preferredLocale as string, `globals/globals`);

			const embed = new EmbedBuilder()
			.setColor("Red")
			.setTitle(`${channel.type === 0 ? texts.text : (channel.type === 2 ? texts.voice : (channel.type === 15 ? texts.forum : (channel.type === 5 ? texts.announcement : (channel.type === 13 ? texts.stage : texts.unknow))))}・${texts.deleted}`)
			.addFields(
				{ name: `<:nametag:1200757678104915978>・__${globalsTexts.name}:__`, value: `\`${channel.name}\`` },
				{ name: ":underage:・__NSFW:__", value: (channel.nsfw === true ? "<a:yes:1205984539852144751>" : "<a:no:1211019198881472622>") },
				{ name: `<:time:1205987554260684870>・__${texts.dateOfCreation}:__`, value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:d> (<t:${Math.floor(channel.createdTimestamp / 1000)}:R>)`, inline: true },
				{ name: `<:time:1205987554260684870>・__${texts.dateOfDelete}`, value: `<t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true }
			)
			.setFooter({ text: `Id: ${channel.id}`, iconURL: client.user?.avatarURL() as string });
			channel.guild.channels.cache.get(id).send({ embeds: [embed] }); // Send the message in log channel
		} catch (err) { console.error(err); }
	}
}
module.exports = event;