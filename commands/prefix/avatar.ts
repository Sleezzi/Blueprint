import { GuildMember, Locale } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "avatar",
	description: "Gives the pdp of a user",
	model: `avatar *\`member\`*`,
	category: "Misc",
	async execute(message, client) {
		try {
			const texts = client.translate(message.guild?.preferredLocale as string, "prefix/avatar");

			await message.channel.sendTyping();
			let member: GuildMember = message.mentions.members?.first() ?? message.guild?.members.cache.get(message.member?.id as string) as GuildMember; // Get the member
			const msg = await message.channel.send({ content: `[${texts.pictureOf} ${member.user.username}](${(member.user.avatarURL() ? member.user.avatarURL() : "https://discord.com/assets/c722e74f644b4a758b11.png")})` }); // Send the message with the avatar url
			setTimeout(() => { // Await 25s
				try {
					if (msg.deletable) {
						msg.delete(); // Delete the message
					}
				} catch(err) { return err; }
			}, 25_000);
			if (message && message.deletable) message.delete();
		} catch(err) {
			console.error(err);
		}
	}
}
module.exports = command;