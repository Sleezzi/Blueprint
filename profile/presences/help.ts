import { ActivityType } from "discord.js";
import { Presence } from "../../interfacies";

const moduleExport: Presence = {
	name: (client) => `${client.config.prefix}help`,
	type: ActivityType.Playing
}

module.exports = moduleExport;