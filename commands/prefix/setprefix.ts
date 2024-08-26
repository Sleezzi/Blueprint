import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "setprefix",
	description: "Change the prefix on this server.",
	permissions: "Administrator",
	model: `setprefix **\`prefix\`**`,
	category: "Moderation",
	async execute(message, client) {
		try {
			if (!message.member?.permissions.has("Administrator")) {
				const msg = await message.reply("<a:no:1211019198881472622>・You do not have permission to do this");
				setTimeout(async () => {
					try {
						msg.delete();
						if (message) message.delete();
					} catch(err) { return err; }
				}, 5000);
				return;
			}
			await message.channel.sendTyping();
			const prefix = message.content.split(' ').slice(1)[0];
			if (!prefix) {
				const msg = await message.reply('You must enter the prefix');
				setTimeout(async () => {
					try {
						msg.delete();
						if (message) message.delete();
					} catch(err) { return err; }
				}, 5000);
				return;
			}
			if (prefix === client.config.prefix) {
				client.database.delete(`/${message.guild?.id}/prefix`);
			} else {
				client.database.set(`/${message.guild?.id}/prefix`, prefix);
			}
			const msg = await message.reply(`The prefix has been successfully updated, now it's \`${prefix}\``);
			setTimeout(async () => {
				try {
					msg.delete(); if (message) message.delete();
				} catch(err) { return err; }
			}, 5000);
		} catch (err) { return err; }
	}
}
module.exports = command;