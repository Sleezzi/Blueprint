import { EmbedBuilder } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "userinfo",
	description: "Gives you information about a member or about you",
	model: `userinfo *\`member\`*`,
	category: "Misc",
	async execute(message, client) {
		try {
			await message.channel.sendTyping();
			let member = message.mentions.members?.first() ?? message.guild?.members.cache.get(message.member?.id as string);

			let roles =  member?.roles.cache.toJSON().length! > 0 ? member?.roles.cache.toJSON().join('>, <@&') : "The member has no role.";

			let level = await client.database.get(`/${message.guild?.id}/levels/${member?.id}`);
			if (!level.level) level = {
				level: 1,
				xp: 0
			};
			const embed = new EmbedBuilder()
			.setColor("Aqua")
			.setTitle(":information:・Information about:")
			.setDescription(`<@${member?.id}>`)
			.setThumbnail(message.author.avatarURL())
			.setAuthor({
				name: member?.user.username as string,
				iconURL: message.member?.avatarURL() as string,
				url: message.url
			})
			.addFields(
				{ name: "<:tag:1200813621970739251> __**Tag:**__", value: `> **\`${member?.user.tag}\`**`},
				{ name: "<:nametag:1200757678104915978> __**Nickname:**__", value: `> ${(member?.nickname === null ? "The member does not have a nickname." : `**\`${member?.nickname}\`**`)}`},
				{ name: "<:ID:1200784630865985598> __**ID:**__", value: `> \`${(member?.id)}\``},
				{ name: `<:boost:1200817314740842616> __**Level${(level > 1 ? `s` : ``)}:**__`, value: `> ${level.level} (${level.xp}/${level.level * 150})`},
				{ name: `<:member:1200816753421328484> __**Role${(member?.roles.cache.toJSON().length as number > 1 ? "s" : "")}:**__`, value: `> ${roles}` },
				{ name: ":inbox_tray:・__**Account created:**__", value: `> <t:${Math.floor(member?.user.createdTimestamp as number / 1000)}:d> (<t:${Math.floor(member?.user.createdTimestamp as number / 1000)}:R>)`},
				{ name: ":inbox_tray:・__**Member since:**__", value: `> <t:${Math.floor(member?.joinedTimestamp as number / 1000)}:d> (<t:${Math.floor(member?.joinedTimestamp as number / 1000)}:R>)`},
				{ name: "<:time:1205987554260684870>・__**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
			)
			.setURL(message.url)
			.setFooter({
				text: `Id: ${message.id}`,
				iconURL: client.user?.avatarURL() as string
			});
			message.channel.send({ embeds: [embed] });
			if (message && message.deletable) message.delete();
		} catch(err) {
			console.error(err);
		}
	}
}
module.exports = command;