import { GuildMember, Message } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "ban",
	permissions: "BanMembers",
	model: ``,
	category: "Moderation",
	async execute(message, client) {
		try {
			await message.channel.sendTyping();
			const texts = client.translate(message.guild?.preferredLocale as string, "prefix/ban");

			let member: GuildMember = message.mentions.members?.first() as GuildMember; // Get the member to ban

			if (!message.member?.permissions.has("BanMembers")) { // Check if the user can ban a member
				const msg = await message.channel.send(texts.unauthorized); // Send a message if the user can't
				setTimeout(() => { // Delete the message after 15s
					try {
						if (msg.deletable) {
							msg.delete();
						}
					} catch(err) { return err; }
				}, 15_000);
				return; // End here
			}
			
			if (!member) {
				const msg = await message.channel.send(`${texts.invalidMention}.`); // Send a message there is no mention
				setTimeout(() => { // Delete the message after 15s
					try {
						if (msg.deletable) {
							msg.delete();
						}
					} catch(err) { return err; }
				}, 15_000);
				return; // End here
			}

			if (message.author.id === member.id) {
				const msg = await message.channel.send(texts.banYourself); // Send a message if the user try to ban himself
				setTimeout(() => { // Delete the message after 15s
					try {
						if (msg.deletable) {
							msg.delete();
						}
					} catch(err) { return err; }
				}, 15000);
				return; // End here
			}
			
			if (!member.bannable) {
				const msg = await message.channel.send(texts.userCantBeBanned); // Send a message if the bot can't ban this member
				setTimeout(() => { // Delete the message after 15s
					try {
						if (msg.deletable) {
							msg.delete();
						}
					} catch(err) { return err; }
				}, 15_000);
				return; // End here
			}

			let duration = message.content.split(" ")[2]; // Get the duration of ban
			let reason = message.content.slice(`${client.config.prefix}ban ${member.user.id} ${duration} `.length); // Get the reason of ban

			await member.ban({ reason: `Reason: "${reason}", ban by: ${message.member.user.tag}` }); // Ban the member
			const msg: Message = await message.channel.send(`${member.user.tag} ${texts.success}: \`${(reason ? reason : texts.noReason)}\``); // Reply to the moderator
			setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5_000); // Delete the reply after 5s
			if (duration) { // If duration
				setTimeout(() => {
					message.guild?.members.unban(member);
				}, parseInt(duration));
			}
		} catch(err) {
			console.error(err);
		}
	}
}
module.exports = command;