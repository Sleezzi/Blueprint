import { Event } from "../interfacies";

const event: Event = {
	name: "StopHandler",
	event: "shardDisconnect", // Send a log message in the console when the bot shutdown
	type: "on",
	execute([event]: [any], client) {
		console.log(`The bot has been stoped${(event.code === 1000 ? "." : ` reason: ${event.reason})`)}`); // Log
	}
}
module.exports = event