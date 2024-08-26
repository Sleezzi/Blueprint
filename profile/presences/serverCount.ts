import { ActivityType } from "discord.js";
import { Presence } from "../../interfacies";

const moduleExport: Presence = {
	name: (client) => {
		const count = client.guilds.cache.toJSON().length
		return `${count} server${count > 1 ? "s" : ""} • 🏠`;
	},
	type: ActivityType.Playing
}

module.exports = moduleExport;