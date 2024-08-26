import { PresenceUpdateStatus } from "discord.js";
import { readdirSync  } from "fs";
import { Event, Presence } from "../interfacies";

const event: Event = {
	name: "UpdateActivityHandler",
	event: "ready", // Puts a custom status on the bot
	type: "on",
	execute([]: any, client) {
		client.user?.setStatus(PresenceUpdateStatus.Online);
		async function delay(ms: number) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		const loop = async () => {
			try {
				for (const file of readdirSync("./profile/presences").filter((file: string) => file.endsWith(".ts"))) {
					const presence: Presence = require(`../profile/presences/${file}`);
					if (presence.condition !== undefined) {
						if (typeof presence.condition === "boolean") {
							if (!presence.condition) continue;
						} else {
							if (!presence.condition(client)) continue;
						}
					}
					client.user?.setActivity(typeof presence.name === "string" ? presence.name : presence.name(client), {
						type: presence.type,
						url: presence.url ?? "https://redeye.sleezzi.fr",
						state: presence.state ?? "Bot made by Sleezzi"
					});
					await delay(15_000);
				}
			} catch(err) { return console.error(err); }
		}
		loop();
		setInterval(loop, readdirSync("./profile/presences").filter(file => file.endsWith(".ts") && (require(`../profile/presences/${file}`).condition === undefined || require(`../profile/presences/${file}`).condition === true)).length * 15_000 + 1);
	}
}
module.exports = event;