import { EmbedBuilder, ForumChannel, VoiceChannel, TextChannel, GuildMember } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";

const event: Event = {
	name: "NewChannel",
	event: "channelCreate", // When a living room is created
	type: "on",
	async execute([channel]: [TextChannel | ForumChannel | VoiceChannel | any], client) {
		try {
			const id: DatabaseInterface["server"]["modules"]["log"] = await client.database.get(`/${channel.guild.id}/modules/log`); // Retrieve the room ID from the database
			if (
				typeof id === "object" || // If there is none
				!channel.guild.channels.cache?.has(id) || // If the channel does not exist/no longer exists
				!channel?.guild.channels.cache?.get(id)?.permissionsFor(channel.guild.members.cache?.find((member: GuildMember) => member.id === client.user?.id))?.has("SendMessages") // If the bot can't send messages in this channel
			) return; // End here
			
			const texts = client.translate(channel.guild?.preferredLocale as string, `events/ChannelCreate`);
			const globalsTexts = client.translate(channel.guild?.preferredLocale as string, `globals/globals`);

			const embed: EmbedBuilder = new EmbedBuilder()
			.setColor("Green")
			.setTitle(`${globalsTexts.new} ${channel.type === 0 ? texts.text : (channel.type === 2 ? texts.voice : (channel.type === 15 ? texts.forum : (channel.type === 5 ? texts.announcement : (channel.type === 13 ? texts.stage : texts.unknow))))}${globalsTexts.channel.toLowerCase()}`)
			.addFields(
				{ name: `<:nametag:1200757678104915978>・__${globalsTexts.name}:__`, value: `\`${channel.name}\`` },
				{ name: `:book:・__${globalsTexts.description}:__`, value: `> ${(channel.topic ? channel.topic : texts.noDescription)}`, inline: true },
				{ name: ":underage:・__NSFW:__", value: (channel.nsfw === true ? "<a:yes:1205984539852144751>" : "<a:no:1211019198881472622>") },
				{ name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`, value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:d> (<t:${Math.floor(channel.createdTimestamp / 1000)}:R>)`, inline: true },
			)
			.setFooter({ text: `Id: ${channel.id}`, iconURL: client.user?.avatarURL() as string });
			const sendChannel: TextChannel = channel.guild.channels.cache.get(id) as TextChannel;
			sendChannel?.send({ embeds: [embed] }); // Send the message in log channel
		} catch (err) { console.error(err); }
	}
}
module.exports = event;