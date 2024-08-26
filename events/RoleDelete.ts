import { EmbedBuilder, Role, TextChannel } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";

const event: Event = {
	name: "Role deleted",
	event: "roleDelete", // Send a log message in the console when the bot shutdown
	type: "on",
	async execute([role]: [Role], client) {
		try {
			const id: DatabaseInterface["server"]["modules"]["log"] = await client.database.get(`/${role.guild.id}/modules/log`); // Retrieve the room ID from the database
			if (
				typeof id === "object" || // If there is none
				!role.guild.channels.cache.has(id) || // If the channel does not exist/no longer exists
				!role.guild.channels.cache.get(id)?.permissionsFor(role.guild.members.cache.find(member => member.id === client.user?.id)!)?.has("SendMessages") // If the bot can't send messages in this channel
			) return; // End here

			const texts = client.translate(role.guild?.preferredLocale as string, `events/roleDelete`);
			const globalsTexts = client.translate(role.guild?.preferredLocale as string, `globals/globals`);
			
			const embed = new EmbedBuilder()
			.setColor("Red")
			.setTitle(`${texts.title}`)
			.addFields(
				{ name: `<:nametag:1200757678104915978>・__${globalsTexts.name}:__`, value: `\`${role.name}\`` },
				{ name: `:shield:・__${globalsTexts.permissions}:__`, value: role.permissions.toArray().join("`, `") || texts.any },
				{ name: `<:time:1205987554260684870>・__${texts.dateOfCreation}:__`, value: `<t:${Math.floor(role.createdTimestamp / 1000)}:d> (<t:${Math.floor(role.createdTimestamp / 1000)}:R>)`, inline: true },
			)
			.setFooter({ text: `Id: ${role.id}`, iconURL: client.user?.avatarURL() as string });
			(role.guild.channels.cache.get(id) as TextChannel)?.send({ embeds: [embed] }); // Send the message in log channel
		} catch (err) { console.error(err); }
	}
}
module.exports = event