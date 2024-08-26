import { Interaction } from "discord.js";
import { readdirSync } from "fs"
import { Event, Modal } from "../interfacies";
import { Log } from "../components";

const event: Event = {
	name: "AppCommandsHandler",
	event: "interactionCreate", // When someone places an commands /
	type: "on",
	async execute([interaction]: [Interaction], client) {
		try {
			if (!interaction.isModalSubmit()) return;
			for (const file of readdirSync("./modals").filter(file => file.endsWith("ts"))) {
				const modal: Modal = require(`../modals/${file}`);
				if (modal.customId === interaction.customId) {
					modal.execute(interaction, client);
					new Log(`%aqua%${interaction.member?.user.username.slice(0, 1).toUpperCase()}${interaction.member?.user.username.slice(1, interaction.member?.user.username.length).toUpperCase()}%reset% used the %yellow%${modal.name}%reset% modal on server %aqua%${interaction.guild?.name}%reset% (%gray%${interaction.guild?.id}%reset%)`)
					return;
				}
			}
		} catch(err) { console.error(err); } // Catch errors and send them to the console
	}
}

module.exports = event;