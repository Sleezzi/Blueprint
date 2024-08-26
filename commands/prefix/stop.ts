import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "stop",
	description: "Stop the bot",
	permissions: "Owner",
	model: `stop`,
	category: "Moderation",
	async execute(message, client) {
		try {
			if (message.author.id === client.config.ownerId) {
				if (message && message.deletable) await message.delete();
				client.kill(client.config.token, true);
			} else {
				const msg = await message.channel.send(`<a:no:1211019198881472622>・<@${message.member?.id}>, you do not have the necessary permissions to use this command`);
				setTimeout(() => {
					msg.delete();
				}, 5000);
				if (message && message.deletable) message.delete();
			}
		} catch (err) {
			return err;
		}
	}
}
module.exports = command;