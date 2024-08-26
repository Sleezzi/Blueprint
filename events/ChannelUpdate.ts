import { TextChannel, GuildMember, EmbedBuilder } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";

const event: Event = {
	name: "ChannelUpdate",
	event: "channelUpdate", // When a channel is edited
	type: "on",
	async execute([oldChannel, channel]: [TextChannel, TextChannel], client) {
		try {
			const id: DatabaseInterface["server"]["modules"]["log"] = await client.database.get(`/${channel.guild.id}/modules/log`);
			if (
				typeof id === "object" || // If there is none
				!channel.guild.channels.cache.has(id) || // If the channel does not exist/no longer exists
				!channel.guild?.channels.cache.get(id)?.permissionsFor(channel.guild.members.cache.find((member: GuildMember) => member.id === client.user?.id) as any)?.has("SendMessages") // If the bot can't send messages in this channel
			) return; // End here

			const texts = client.translate(channel.guild?.preferredLocale as string, `events/ChannelUpdate`);
			const globalsTexts = client.translate(channel.guild?.preferredLocale as string, `globals/globals`);

			const embed = new EmbedBuilder()
			.setColor(0xffa500)
			.setTitle(`${channel.type === 0 ? texts.text : (channel.type === 2 ? texts.voice : (channel.type === 15 ? texts.forum : (channel.type === 5 ? texts.announcement : (channel.type === 13 ? texts.stage : texts.unknow))))}・${texts.title}`)
			.setFooter({
				text: `Id: ${channel.id}`,
				iconURL: client.user?.avatarURL() as string,
			});
			
			if (oldChannel.nsfw !== channel.nsfw) { // Check if the NSFW option has not changed
				embed.addFields(
					{ name: `:underage:・__NSFW before:__`, value: `> ${(oldChannel.nsfw === true ? `<a:yes:1205984539852144751>` : `<a:no:1211019198881472622>`)}`, inline: true},
					{ name: `:underage:・__NSFW after:__`, value: `> ${(channel.nsfw === true ? `<a:yes:1205984539852144751>` : `<a:no:1211019198881472622>`)}`, inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
				); // If it has changed then we add that in the embed (message)
			}
			
			if (oldChannel.topic !== channel.topic) { // Check if the topic option has not changed
				embed.addFields(
					{ name: `:book:・__Old description:__`, value: `> ${oldChannel.topic}`, inline: true},
					{ name: `:book:・__New description:__`, value: `> ${channel.topic}`, inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
				); // If it has changed then we add that in the embed (message)
			} else {
				embed.addFields(
					{ name: `:book:・__Description:__`, value: `> ${channel.topic}`, inline: true},
				); // If it has not changed then we add that in the embed (message)
			}
			
			if (oldChannel.name !== channel.name) { // Check if the channel has changed its name
				embed.addFields(
					{ name: `<:nametag:1200757678104915978>・__Old name:__`, value: `> \`${oldChannel.name}\``, inline: true },
					{ name: `<:nametag:1200757678104915978>・__New name:__`, value: `> <#${channel.id}> \`(${channel.name})\``, inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
				); // If it has changed then we add that in the embed (message)
			} else {
				embed.addFields(
					{ name: `<:nametag:1200757678104915978>・__Name:__`, value: `> <#${channel.id}> \`(${channel.name})\``},
				); // If it has not changed then we add that in the embed (message)
			}
			embed.addFields(
				{ name: `<:time:1205987554260684870>・__${texts.DateOfCreation}:__`, value: `> <t:${Math.floor(channel.createdTimestamp / 1000)}:d> (<t:${Math.floor(channel.createdTimestamp / 1000)}:R>)`, inline: true},
				{ name: `<:time:1205987554260684870>・__${texts.DateOfEdit}:__`, value: `> <t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true},
				{ name: '\u200B', value: '\u200B', inline: true }
			);
			(channel.guild.channels.cache.get(id) as TextChannel).send({ embeds: [embed] }); // Send the message in log channel
		} catch (err) { console.error(err); }
	}
}
module.exports = event;