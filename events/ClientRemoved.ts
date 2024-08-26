import { Guild } from "discord.js";
import { Event } from "../interfacies";
import { Log } from "../components";

const event: Event = {
	name: "ClientLeaveHandler",
	event: "guildDelete", // When the bot leaves a server
	type: "on",
	async execute([guild]: [Guild], client) {
		client.database.delete(`/${guild.id}`); // Deletes data from the server to the database (allows you not to overload the database)
		new Log(`${client.user?.username} has been removed in %aqua%${guild.name}%reset% (%gray%${guild.id}%reset%)`); // Log
	}
}
module.exports = event;