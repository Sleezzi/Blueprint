import { ActivityType } from "discord.js";
import { Presence } from "../../interfacies";

const moduleExport: Presence = {
	name: "Happy Valentine day • ❤️",
	type: ActivityType.Watching,
	condition: new Date().getMonth() === 9
}

module.exports = moduleExport;