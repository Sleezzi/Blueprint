import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "headortail",
	description: "Toss head or tail",
	model: `headortail`,
	category: "Games",
	async execute(message, client) {
		try {
			await message.channel.sendTyping();
			let face = message.content.toLowerCase().split(' ').slice(1)[0];
			
			const result = Math.random() < 0.5 ? 'tail' : 'head';
			const texts = client.translate(message.guild?.preferredLocale as string, "prefix/headortail");
			
			if (face) {
				if (face !== "head" && face !== "tail") {
					const msg = await message.reply(texts.invalid);
					setTimeout(async () => {
						try {
							msg.delete();
						} catch(err) { return err; }
					}, 5000);
					return;
				}
				if (result === face) {
					await message.channel.send(texts.win);
				} else {
					await message.channel.send(texts.lose);
				}
			} else {
				await message.channel.send(`${texts.fall} \`${result}\``);
			}
			if (message && message.deletable) message.delete();
		} catch(err) {
			console.error(err);
		}
	}
}

module.exports = command;