import { EmbedBuilder, TextChannel } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "kick",
	description: "kick a members",
	permissions: "ModerateMembers",
	model: `kick **\`member\`** *\`The reason for the ban\`*`,
	category: "Moderation",
	async execute(message, client) {
		try {
			await message.channel.sendTyping();
			let member = message.mentions.members?.first();
			await message.delete();
			const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");
			const texts = client.translate(message.guild?.preferredLocale as string, "prefix/kick");

			if (!message.member?.permissions.has("ModerateMembers")) {
				const msg = await (message.channel as TextChannel).send(`${texts.noPerm}.`);
				setTimeout(() => {
					try {
						if (msg.deletable) {
							msg.delete();
						}
					} catch(err) { console.error(err); }
				}, 5000);
				return;
			}
			
			if (!member) {
				const msg = await message.channel.send(`${texts.invalidMention}.`);
				setTimeout(() => {
					try {
						if (msg.deletable) {
							msg.delete();
						}
					} catch(err) { console.error(err); }
				}, 5000);
				return;
			}

			if (message.author.id === member.id) {
				const msg = await message.channel.send(`${texts.yourself}.`);
				setTimeout(() => {
					try {
						if (msg.deletable) {
							msg.delete();
						}
					} catch(err) { console.error(err); }
				}, 5000);
				return;
			}
			
			if (!member.bannable) {
				const msg = await message.channel.send(`${texts.botCant}.`);
				setTimeout(() => {
					try {
						if (msg.deletable) {
							msg.delete();
						}
					} catch(err) { console.error(err); }
				}, 5000);
				return;
			}
			let reason = message.content.split(" ").map((string, index) => {
				if (index === message.content.split(" ").length) return string;
				if (index > 2) return `${string} `;
			}).join("") || texts.noReason;

			await member.kick(`${globalsTexts.reason}: "${reason}", ${texts.kickBy}: ${message.member.user.username}`);
			const embed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setAuthor({
				name: message.member.user.username,
				iconURL: message.member.user.avatarURL() as string,
				url: message.url,
			})
			.setTitle(`<a:exit:1205202384326885498>・${texts.title}`)
			.addFields(
				{ name: `<:nametag:1200757678104915978>・__${globalsTexts.name}:__`, value:`${member.user.username} (*${member.id}*)` },
				{ name: `<a:trash:1213524421621448756>・__${globalsTexts.reason}:__`, value:`${reason}` },
				{ name: `<:nametag:1200757678104915978>・__${globalsTexts.author}:__`, value:`${message.member.user.username}` },
				{ name: `<:time:1205987554260684870>・__${globalsTexts.Date}:__`, value:`${member.user.username}` },
			)
			.setFooter({
				text: `Id: ${message.id}`,
				iconURL: client.user?.avatarURL() as string,
			});
			const msg = await message.channel.send({ embeds: [ embed ] });
			setTimeout(() => {
				try {
					msg.delete();
				} catch(err) { console.error(err); }
			}, 5000);
		} catch(err) {
			console.error(err);
		}
	}
}
module.exports = command;