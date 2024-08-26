import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "image",
	category: "Misc",
	async execute(message, client) {
		try {
			await message.channel.sendTyping();
			const theme = message.content.split(" ").slice(0, 1).join(" ");
			const response = await fetch(`https://source.unsplash.com/1920x1080/?${theme}`);
			const texts = client.translate(message.guild?.preferredLocale as string, "prefix/image");
			
			if (response.ok) {
				const msg = await message.channel.send(`${texts.success}\n[.](${response.url})`);
				setTimeout(async () => {
					try {
						msg.delete();
					} catch(err) { return err; }
				}, 10000);
			} else {
				const msg = await message.channel.send(texts.notFound);
				setTimeout(async () => {
					try {
						msg.delete();
					} catch(err) { return err; }
				}, 5000);
			}
		} catch(err) {
			const msg = await message.channel.send(client.translate(message.guild?.preferredLocale as string, "prefix/image").error);
			setTimeout(async () => {
				try {
					msg.delete();
				} catch(err) { return err; }
			}, 5000);
		}
		if (message && message.deletable) message.delete();
	}
}
module.exports = command;