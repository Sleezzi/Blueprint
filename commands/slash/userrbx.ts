import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("userrbx")
	.setNameLocalizations({
		"en-US": "userrbx",
		fr: "userrbx"
	})
	.setDescription("Gives information about a Roblox user")
	.setDescriptionLocalizations({
		"en-US": "Gives information about a Roblox user",
		fr: "Donne des informations sur un joueur Roblox"
	})
	.addStringOption(option =>
		option.setName("user")
		.setNameLocalizations({
			fr: "utilisateur",
			"en-US": "user"
		})
		.setDescription("The id of the player")
		.setDescriptionLocalizations({
			fr: "L'id du joueur",
			"en-US": "The id of the player"
		})
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			let user = interaction.options.getString('user');
			let response: any;
			let data = {
				username: "",
				desc: "",
				banned: false,
				verified: false,
				created_at: "",
				avatarURL: "",
			};
			response = await fetch(`https://users.roblox.com/v1/users/${user}`);
			if (response.status !== 200) {
				reply(`Unable to find "${user}"` );
				return;
			}
			response = await response.json();
			data.username = response.name;
			data.desc = response.description;
			data.banned = response.isBanned;
			data.verified = response.hasVerifiedBadge;
			data.created_at = response.created;
			response = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user}&size=48x48&format=Png&isCircular=false`);
			if (response.status !== 200) {
				reply(`An error has occurred` );
				return;
			}
			response = await response.json();
			data.avatarURL = response.data[0].imageUrl;
			const embed: EmbedBuilder = new EmbedBuilder()
			.setColor(0x00FF00)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
				url: "https://redeye.sleezzi.fr",
			})
			.setTitle(`Roblox User • ${data.username}`)
			.setThumbnail(data.avatarURL)
			.addFields(
				{ name: `<:nametag:1200757678104915978>・__Name:__`, value: `> \`${data.username}\``, inline: true },
				{ name: `<:ID:1200784630865985598>・__Id:__`, value: `> \`${user}\``, inline: true },
				{ name: `:bust_in_silhouette:・__Avatar:__`, value: `> [Image](${data.avatarURL})`, inline: true },
				{ name: `:book:・__Bio:__`, value: `> \`${(data.desc ? data.desc : "Unset")}\``, inline: true },
				{ name: `:link:・__URL:__`, value: `> [${data.username}](https://www.roblox.com/users/${user}/profile)`, inline: true },
				{ name: `<a:ban:1205986766687965276>・__Banned:__`, value: `> ${(data.banned ? `<a:yes:1205984539852144751>` : `<a:no:1211019198881472622>`)}`, inline: true },
				{ name: `<a:verified:1205995010567184475>・__Verified:__`, value: `> ${(data.verified ? `<a:yes:1205984539852144751>` : `<a:no:1211019198881472622>`)}`, inline: true },
				{ name: `<:time:1205987554260684870>__Account created at:__`, value: `> \`${data.created_at}\``, inline: true },
				{ name: `<:time:1205987554260684870>__Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: false}
			)
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string,
			});
			reply({ embeds: [ embed ] });
		} catch(err) { return err; }
	}
}

module.exports = commandExport;