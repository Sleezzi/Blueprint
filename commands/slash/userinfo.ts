import { EmbedBuilder, SlashCommandBuilder, User } from "discord.js";
import { CommandSlash, Database as DatabaseInterface } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("userinfo")
	.setNameLocalizations({
		"en-US": "userinfo",
		fr: "userinfo"
	})
	.setDescription("Gives you information about a member or about you")
	.setDescriptionLocalizations({
		"en-US": "Gives you information about a member or about you",
		fr: "Donne des informations sur un membre du serveur"
	})
	.addUserOption(option =>
		option.setName("member")
		.setNameLocalizations({
					fr: "membre",
					"en-US": "member"
				})
		.setDescription("Send to a member")
		.setDescriptionLocalizations({
					fr: "Envoyer a un membre",
					"en-US": "Send to a member"
				})
		.setRequired(false)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			let member = interaction.guild?.members.cache.find((m) => m.id === (interaction.options.getUser("member") as User ? interaction.options.getUser("member") : interaction.member?.user)?.id);
			let roles: any = "The member has no role.";
			if (member?.roles.cache.toJSON().length as number > 0) {
				for (let i = 0; i < (member?.roles.cache.toJSON().length as number); i++) {
					roles = `<@&${member?.roles.cache.toJSON().join('>, <@&')}>`;
				}
			}
			let level: DatabaseInterface["server"]["levels"]["user"] = await client.database.get(`/${interaction.guild?.id}/levels/${member?.user.id}`);
			if (!level.level) level = {
				level: 1,
				xp: 0
			};
			const embed = new  EmbedBuilder()
			.setColor("Aqua")
			.setTitle("Information about:")
			.setDescription(`<@${member?.user.id}>`)
			.setThumbnail(interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.avatarURL() as string)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.avatarURL() as string,
				url: "https://redeye.sleezzi.fr"
			})
			.addFields(
				{ name: "<:tag:1200813621970739251>・__**Tag:**__", value: `> **\`${member?.user.username}\`**`},
				{ name: "<:nametag:1200757678104915978>・__**Nickname:**__", value: `> ${(member?.nickname === null ? "The member does not have a nickname." : `**\`${member?.nickname}\`**`)}`},
				{ name: "<:ID:1200784630865985598>・__**ID:**__", value: `> \`${(member?.user.id)}\``},
				{ name: `<:boost:1200817314740842616>・__**Level:**__`, value: `> ${level.level} (${level.xp}/${level.level * 150})`},
				{ name: `<:member:1200816753421328484>・__**Role${(member?.roles.cache.toJSON().length as number > 1 ? "s" : "")}:**__`, value: `> ${roles}` },
				{ name: ":inbox_tray:・__**Account created:**__", value: `> <t:${Math.floor(member?.user.createdTimestamp as number / 1000)}:d> (<t:${Math.floor(member?.user.createdTimestamp as number / 1000)}:R>)`},
				{ name: ":inbox_tray:・__**Member since:**__", value: `> <t:${Math.floor(member?.joinedTimestamp as number / 1000)}:d> (<t:${Math.floor(member?.joinedTimestamp as number / 1000)}:R>)`},
				{ name: "<:time:1205987554260684870>・__**Date:**__", value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`},
			)
			.setURL("https://redeye.sleezzi.fr")
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string
			});
			reply({ embeds: [embed] });
		} catch(err) { return err; }
	}
}

module.exports = commandExport;