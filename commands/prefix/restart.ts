import { Log } from "../../components";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "restart",
	description: "Restart the bot",
	permissions: "Owner",
	model: `restart`,
	category: "Moderation",
	async execute(message, client) {
		try {
			if (message && message.deletable) await message.delete();
			if (message.author.id === client.config.ownerId) {
				const msg = await message.channel.send("Restating...");
				await client.restart(require("../../config.json").token); // Notify Discord that the bot is stopping
				msg.edit("Restated!");
				new Log(`\n  %green%➜ Restarted%reset%\n`); // Log
			} else {
				const msg = await message.channel.send(`<a:no:1211019198881472622>・<@${message.member?.id}>, you do not have the necessary permissions to use this command`);
				setTimeout(() => {
					try {
						msg.delete();
					} catch (err) {
						return err;
					}
				}, 5000);
			}
		} catch (err) {
			return err;
		}
	}
}
module.exports = command;