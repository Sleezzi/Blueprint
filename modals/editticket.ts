import { Database as DatabaseInterface, Modal } from "../interfacies";

const moduleExport: Modal = {
	name: "Ticket",
	customId: "editTicket",
	async execute(interaction, client) {
		try {
			const ticket: DatabaseInterface["server"]["tickets"]["user"]["id"] = await client.database.get(`/${interaction.guild?.id}/tickets/${interaction.member?.user.id}/${interaction.fields.getTextInputValue("id")}`);
			if (ticket.content) {
				client.database.set(`/${interaction.guild?.id}/tickets/${interaction.member?.user.id}/${interaction.fields.getTextInputValue("id")}`, {
					content: interaction.fields.getTextInputValue("content"),
					madeAt: ticket.madeAt,
					updatedAt: Math.floor(Date.now() / 1000)
				});
				interaction.reply(`Ticket edited!`);
			} else {
				interaction.reply(`Error: Bad id, are you sure ${interaction.fields.getTextInputValue("id")} exists?`);
			}
		} catch (err) { console.error(err); }
	}
}

module.exports = moduleExport;