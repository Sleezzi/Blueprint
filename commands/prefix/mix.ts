import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "mix",
	description: "Mix words together.",
	model: `mix **\`First word\`** **\`Seconde word\`**`,
	category: "Games",
	async execute(message, client) {
		try {
			await message.channel.sendTyping();
			const args = message.content.split(' ').slice(1);
			if (args.length < 2) {
				const msg = await message.reply('You must enter the 2 words you want to merge');
				setTimeout(async () => {
					try {
						msg.delete();
						if (message) message.delete();
					} catch(err) { return err; }
				}, 5000);
				return;
			}
			const letters = args[0].split("").concat(args[1].split(""));
			for (let i = letters.length - 1; i > 0; i--) {
				const random = Math.floor(Math.random() * (i + 1));
				[letters[i], letters[random]] = [letters[random], letters[i]];
			}
			const msg = await message.reply(`\`${args[0]}\` + \`${args[1]}\` = **${letters.join("")}**`);
			setTimeout(async () => {
				try {
					msg.delete(); if (message) message.delete();
				} catch(err) { return err; }
			}, 5000);
		} catch (err) { return err; }
	}
}

module.exports = command;