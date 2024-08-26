import { ActivityType } from "discord.js";
import { Presence } from "../../interfacies";

const moduleExport: Presence = {
	name: (client) => {
		const count = client.guilds.cache.toJSON().map(guild => guild.members.cache.toJSON().filter(member => !member.user.bot).map(member => member.id)).flat().length;
		return `${count} member${count > 1 ? "s" : ""} • 👤`;
	},
	type: ActivityType.Playing
}

module.exports = moduleExport;