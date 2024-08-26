import { Message, TextChannel } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "clean",
	permissions: "ManageMessages",
	model: `clean`,
	category: "Moderation",
	async execute(message: Message, client) {
		try {
			await message.channel.sendTyping();

			const texts = client.translate(message.guild?.preferredLocale as string, "prefix/clean");
			const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");

			if (!message.member?.permissions.has("ManageMessages")) {
				const msg = await message.reply({embeds: [
					{
						title: `<a:no:1211019198881472622>・${texts.unauthorized}`,
						color: 0xFF0000,
						author: {
							name: message.member?.user.tag as string,
							icon_url: message.member?.user.avatarURL() as string,
							url: message.url,
						},
						footer: {
							text: `Id: ${message.id}`,
							icon_url: client.user?.avatarURL() as string,
						},
					}
				]});
				setTimeout(() => {
					try {
						if (msg.deletable) msg.delete();
					} catch(err) { return err; }
				}, 5_000);
				return;
			}
			let messages: any = { size: 1};
			let kill = false;
			setTimeout(() => kill = true, 5_000);
			let messagesDeleted = 0;
			do {
				messages = await message.channel.messages.fetch({ limit: 100 })
				.then(messages => messages.filter((msg) => msg.member?.id === client.user?.id && 1_209_600_000 > Date.now() - (msg.createdAt as any) && msg.bulkDeletable));
				try {
					await (message.channel as TextChannel).bulkDelete(messages as any);
				} catch(err) { return err; }
				messagesDeleted += messages.size;
			} while (messages.size >= 2 && !kill);
			try { if (message && message.id) message.delete();} catch(err) { return err; }
			const msg: Message = await message.channel.send({embeds: [
				{
					title: `<a:trash:1213524421621448756>・${messagesDeleted > 1 ? texts.success_plurals : texts.success} (${messagesDeleted} ${messagesDeleted > 1 ? globalsTexts.messages.toLowerCase() : globalsTexts.message.toLowerCase()})`,
					color: 0x00FF00,
					author: {
						name: message.member.user.tag,
						icon_url: message.member.user.avatarURL() as string,
						url: message.url,
					},
					footer: {
						text: `Id: ${message.id}`,
						icon_url: client.user?.avatarURL() as string,
					},
				}
			]});
			setTimeout(() => {
				try {
					if (msg.deletable) msg.delete();
				} catch(err) { return err; }
			}, 5_000);
		} catch(err) { return err; }
	}
}
module.exports = command;