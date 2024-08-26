import { Database as DatabaseInterface, CommandPrefix } from "../../interfacies";

const commandExport: CommandPrefix = {
	name: "disablecmd",
	permissions: "Administrator",
	category: "Moderation",
	async execute(message, client) {
		await message.channel.sendTyping();
		
		const texts = client.translate(message.guild?.preferredLocale as string, "prefix/disablecmd");
		
		if (!message.member?.permissions.has("Administrator")) {
			const msg = await message.reply(`<a:no:1211019198881472622>・${texts.missingPermission}`);
			setTimeout(async () => {
				try {
					msg.delete();
				} catch(err) { return err; }
			}, 5000);
			return;
		}
		let command = message.content.split(' ').slice(1)[0];
		if (!command) {
			const msg = await message.reply(texts.invalidMessage);
			setTimeout(async () => {
				try {
					msg.delete();
				} catch(err) { return err; }
			}, 5000);
			return;
		}
		if (!client.commands.prefix.has(command)) {
			const msg = await message.reply(texts.invalidCommand);
			setTimeout(async () => {
				try {
					msg.delete();
				} catch(err) { return err; }
			}, 5000);
			return;
		}
		let commands: DatabaseInterface["server"]["disabled"] = await client.database.get(`/${message.guild?.id}/disabled`);
		if (!commands![0]) commands = [];
		if (commands?.find(cmd => cmd === command)) {
			const msg = await message.reply(texts.already);
			setTimeout(async () => {
				try {
					msg.delete();
				} catch(err) { return err; }
			}, 5000);
			return;
		}
		commands?.push(command);
		client.database.set(`/${message.guild?.id}/disabled`, commands as any);
		const msg = await message.reply(texts.success);
		setTimeout(async () => {
			try {
				msg.delete();
			} catch(err) { return err; }
		}, 5000);
	}
}
module.exports = commandExport;