import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("badge")
	.setNameLocalizations({
		"en-US": "badge",
		fr: "badge"
	})
	.setDescription("Gives information about a Roblox badge")
	.setDescriptionLocalizations({
		"en-US": "Gives information about a Roblox badge",
		fr: "Donne des informations sur un badge Roblox"
	})
	.addNumberOption(option => 
		option.setName("id")
		.setNameLocalizations({
			fr: "id",
			"en-US": "id"
		})
		.setDescription("The id of the badge")
		.setDescriptionLocalizations({
			fr: "L'id du badge",
			"en-US": "The id of the badge"
		})
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			let id = interaction.options.getNumber('id');
			let response: any;
			response = await fetch(`https://badges.roblox.com/v1/badges/${id}`);
			if (response.status !== 200) {
				reply(`Unable to find "${id}"`);
				return;
			}
			response = await response.json();
			const embed: EmbedBuilder = new EmbedBuilder()
			.setColor(0x00FF00)
			.setTitle(`Roblox Badges • ${response.name}`)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
				url: "https://redeye.sleezzi.fr",
			})
			.addFields(
				{ name: `<:nametag:1200757678104915978>・__Name:__`, value: `> \`${response.name}\``, inline: true },
				{ name: `<:ID:1200784630865985598>・__Id:__`, value: `> \`${id}\``, inline: true },
				{ name: `:book:・__Description:__`, value: `> \`${(response.description ? response.description : "Unset")}\``, inline: true },
				{ name: `:link __URL:__`, value: `> [${response.name}](https://www.roblox.com/badges/${id}/)`, inline: true },
				{ name: `:chart_with_upwards_trend:・__Stats:__`, value: `> ${response.statistics.winRatePercentage * 100}% (owned ${response.statistics.awardedCount} times)`, inline: true },
				{ name: `:play_pause:・__Enable:__`, value: `> ${(response.enabled ? `<a:yes:1205984539852144751>` : `<a:no:1211019198881472622>`)}`, inline: true },
				{ name: `:video_game:・__Game:__`, value: `> \`${response.awardingUniverse.name}\` (id: \`${response.awardingUniverse.id}\`)`, inline: false },
				{ name: `<:time:1205987554260684870>・__Created at:__`, value: `> \`${response.created}\``, inline: true },
				{ name: `<:time:1205987554260684870>・__Last update:__`, value: `> \`${response.updated}\``, inline: true },
				{ name: `<:time:1205987554260684870>・__Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: false}
			)
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string,
			});
			response = await fetch(`https://thumbnails.roblox.com/v1/badges/icons?badgeIds=${id}&size=150x150&format=Png&isCircular=false`);
			if (response.status !== 200) {
				reply(`An error has occurred`);
				return;
			}
			response = await response.json();
			embed.setThumbnail(response.data[0].imageUrl);
			reply({ embeds: [ embed ] });
		} catch(err) { return err; }
	}
}

module.exports = commandExport;