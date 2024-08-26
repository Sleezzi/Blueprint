import { Guild, REST, Routes } from "discord.js";
import { Client, Event } from "../interfacies";
import { Log } from "../components";

const event: Event = {
	name: "registerAppsCommands",
	event: "ready", // Records application commands when the bot is launched
	type: "once", // Executes only once
	async execute([]: any, client: Client) {
		try {
			client.guilds.cache.forEach(async (guild: Guild) => {
				try {
					// The put method is used to fully refresh all commands in the guild with the current set
					const data: any = await new REST().setToken(client.config.token).put(
						Routes.applicationGuildCommands(client.user?.id as string, guild.id),
						{ body: client.commands.app.filter(cmd => {
							if (!cmd.servers || cmd.servers === "All") return true;
							if (cmd.servers === "Owner") {
								if (!client.config.ownerServer) return true;
								if (guild.id === client.config.ownerServer) return true;
								return false;
							}
							if (cmd.servers?.find(server => server === guild.id)) return true;
							return false;
						}).map(cmd => cmd.data) },
					);
					new Log(`Successfully updated ${data.length} slash command${(data.length > 1 ? "s" : "")} in %aqua%${guild.name}%reset% (%gray%${guild.id}%reset%) server.`);
				} catch(err) { console.error(err); }
			});
		} catch (err) { console.error(err); }
	}
}
module.exports = event;