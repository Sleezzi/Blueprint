import { ChannelType, EmbedBuilder, Message } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "slowmode",
	model: `slowmode *\`number\`*`,
	category: "Moderation",
	async execute(message, client) {
		try {
			if (message.deletable) message.delete();
			if (message.channel.type !== ChannelType.GuildText) return;

			await message.channel.sendTyping();
			
			const texts = client.translate(message.guild?.preferredLocale as string, "prefix/slowmode");
			const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");
			
			if (!message.member?.permissionsIn(message.channel).has("ManageChannels")) {
				const msg = await message.channel.send(`${texts.unauthorized}`);
				if (msg.deletable) {
					setTimeout(() => { try { msg.delete(); } catch(err) { return err; }}, 5000);
				}
				return;
			}

			const time: number = parseInt(message.content.split(' ').slice(1)[0]);
			if (!time && time !== 0) {
				const msg = await message.channel.send(`${texts.invalid}`);
				if (msg.deletable) {
					setTimeout(() => { try { msg.delete(); } catch(err) { return err; }}, 5000);
				}
				return;
			}
			await message.channel.setRateLimitPerUser(time);
			const msg = await message.channel.send(`${texts.success}`);
			if (msg.deletable) {
				setTimeout(() => { try { msg.delete(); } catch(err) { return err; }}, 5000);
			}
		} catch(err) { console.error(err); }
	}
}
module.exports = command;