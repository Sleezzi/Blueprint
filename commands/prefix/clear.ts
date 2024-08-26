import { TextChannel } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "clear",
	permissions: "ManageMessages",
	category: "Moderation",
	async execute(message, client) {
		await message.channel.sendTyping();
		const texts = client.translate(message.guild?.preferredLocale as string, "prefix/clear");
		const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");

		if (!message.member?.permissions.has("ManageMessages")) {
			const msg = await message.reply({embeds: [{
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
			}]});
			setTimeout(async () => {
				try {
					msg.delete(); if (message) message.delete();
				} catch(err) { return err; }
			}, 5_000);
			return;
		}
		await message.channel.sendTyping();
		let amount: number = parseInt(message.content.split(' ').slice(1)[0]);
		if (!amount) {
			const msg = await message.reply({embeds: [{
				title: `<a:no:1211019198881472622>・${texts.invalidNum}`,
				color: 0xFF0000,
				author: {
					name: message.member.user.tag,
					icon_url: message.member.user.avatarURL() as string,
					url: message.url,
				},
				footer: {
					text: `Id: ${message.id}`,
					icon_url: client.user?.avatarURL() as string,
				},
			}]});
			setTimeout(async () => {
				try {
					msg.delete();
				} catch(err) { return err; }
			}, 5000);
			return;
		}
		
		amount++;
		if (amount > 100) amount = 100;
		try {
			const messages = await message.channel.messages.fetch({ limit: amount })
			.then(messages => messages.filter((msg) => 1_209_600_000 > Date.now() - (msg.createdAt as any) && msg.bulkDeletable));
			await (message.channel as TextChannel).bulkDelete(messages as any);
			const msg = await message.channel.send({ embeds: [{
				title: `<a:trash:1213524421621448756>・${messages.size - 1 > 1 ? texts.success_plurals : texts.success} (${messages.size - 1} ${messages.size - 1 > 1 ? globalsTexts.messages.toLowerCase() : globalsTexts.message.toLowerCase()})`,
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
			}]});
			setTimeout(async () => {
				try {
					msg.delete();
				} catch(err) { return err; }
			}, 5000);
		} catch(err) { return err; }
	}
}
module.exports = command;