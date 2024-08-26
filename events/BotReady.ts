import { Event } from "../interfacies";
import { Log, RedEyeLog } from "../components";

const event: Event = {
	name: "BotReady",
	event: "ready", // When the bot is launched
	type: "on",
	execute([], client) {
		process.title = "RedEye";
		if (process.stdout.columns < 28) { // Check the width of the console
			new Log("%red%R%green%E%yellow%D%blue%E%purpule%Y%aqua%E%reset% %green%READY%reset%\n\n\n  %green%➜%reset%  press h to show help\n  %green%➜%reset%  press c to clear\n  %green%➜%reset%  press r to restart\n  %green%➜%reset%  press e to exit\n\n\n\n"); // Log
		} else {
			RedEyeLog();
		}
	}
}
module.exports = event;