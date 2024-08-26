import { Guild, GuildMember, TextChannel, REST, Routes, EmbedBuilder } from "discord.js";
import { Event } from "../interfacies";
import { Log } from "../components";

const event: Event = {
	name: "ClientJoinHandler",
	event: "guildCreate", // When the bot is added to a server
	type: "on",
	async execute([guild]: [Guild], client) {
		try {
			new Log(`${client.user?.username} has been added in "${guild.name}" (${guild.id})`); // Log
			const data: any = await new REST().setToken(client.config.token).put( // Upload application commands to the server
				Routes.applicationGuildCommands(client.user?.id as string, guild.id),
				{ body: client.commands.app.map((cmd: any) => cmd.data) },
			);
			new Log(`Successfully added ${data.length} slash command${(data.length > 1 ? "s" : "")} in ${guild.id} server.`); // Log
			const embed = new EmbedBuilder()
			.setTitle(guild.name)
			.setDescription(guild.description || "*null*")
			.setColor("Green")
			.addFields(
				{
					name: "<:ID:1200784630865985598>・ID:",
					value: `${guild.id}`
				},
				{
					name: `<:member:1200816753421328484>・Member${guild.memberCount > 1 ? "s" : ""}:`,
					value: `${guild.memberCount}`
				},
				{
					name: "<:owner:1200816888364683396>・__**Owner:**__",
					value: `${guild?.members.cache.find(member => member.id === guild?.ownerId)?.user.username} (id: ${guild?.ownerId})`
				}, // Get the owner name & id
				{
					name: ":computer:・__**Server created:**__",
					value: `<t:${Math.floor(guild?.createdTimestamp as number / 1000)}:d> (<t:${Math.floor(guild?.createdTimestamp as number / 1000)}:R>)`
				}, // Get when the server has been created
				{
					name: `<:time:1205987554260684870>・__**Date:**__`,
					value: `<t:${Math.floor(guild.members.cache.get(client.user?.id as string)?.joinedTimestamp as number / 1000)}:d> (<t:${Math.floor(guild.members.cache.get(client.user?.id as string)?.joinedTimestamp as number / 1000)}:R>)`
				}
			)
			.setURL("https://redeye.sleezzi.fr")
			.setThumbnail(guild.iconURL() || "https://redeye.sleezzi.fr/");
			const channel = await client.guilds.cache.get(client.config.ownerServer)?.members.cache.get(client.config.ownerId)?.createDM();
			channel?.send({embeds: [embed]});
		} catch (err) { console.error(err); }
	}
}
module.exports = event;