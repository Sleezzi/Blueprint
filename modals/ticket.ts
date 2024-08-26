import { Modal } from "../interfacies";

const moduleExport: Modal = {
	name: "Ticket",
	customId: "newTicket",
	execute(interaction, client) {
		try {
			const { v1: uuid } = require("uuid");
			const id = uuid();
			client.database.set(`/${interaction.guild?.id}/tickets/${interaction.member?.user.id}/${id}`, {
				content: interaction.fields.getTextInputValue("content")?.replace(/\`/g, "``"),
				madeAt: Math.floor(Date.now() / 1000)
			});
			interaction.reply({ content: `The ticket has been created, (id of ticket: \`${id}\`)`, ephemeral: true });
		} catch (err) { console.error(err); }
	}
}

module.exports = moduleExport;