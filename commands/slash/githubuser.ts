import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
		.setName("githubuser")
		.setNameLocalizations({
			"en-US": "githubuser",
			fr: "githubutilisateur"
		})
		.setDescription("Gives information about a GitHub user")
		.setDescriptionLocalizations({
			"en-US": "Gives information about a GitHub user",
			fr: "Donne des informations sur un utilisateur GitHub"
		})
		.addUserOption(option => 
			option.setName("user")
			.setNameLocalizations({
					fr: "utilisateur",
					"en-US": "user"
				})
			.setDescription("The name of the GitHub user")
			.setDescriptionLocalizations({
					fr: "Le nom de l'utilisateur GitHub",
					"en-US": "The name of the GitHub user"
				})
			.setRequired(true)
		)
		.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			let user = interaction.options.getString('user');
			let response: any = await fetch(`https://api.github.com/users/${user}`)
			if (response.status !== 200) {
				reply(`Unable to find "${user}"` );
				return;
			}
			response = await response.json();
			const embed: EmbedBuilder = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle(`GitHub • ${response.login}`)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
				url: "https://redeye.sleezzi.fr",
			})
			.setThumbnail(response.avatar_url)
			.addFields(
				{ name: `<:nametag:1200757678104915978>・__Name:__`, value: `> \`${response.login}\``, inline: true },
				{ name: `<:ID:1200784630865985598>・__Id:__`, value: `> \`${response.id}\``, inline: true },
				{ name: `:camera:・__Avatar:__`, value: `> [Image](${response.avatar_url})`, inline: true },
				{ name: `:book:・__Bio:__`, value: `> \`${(response.bio ? response.bio : "Unset")}\``, inline: true },
				{ name: `:link:・__URL:__`, value: `> [${response.login}](${response.html_url})`, inline: true },
				{ name: `:necktie:・__Company:__`, value: `> \`${(response.company ? response.company : "Unset")}\``, inline: true },
				{ name: `:globe_with_meridians:・__Website:__`, value: `> ${(response.blog ? `[Click](${response.blog})` : "`Unset`")}`, inline: true },
				{ name: `:gear:・__Type:__`, value: `> \`${response.type}\``, inline: true },
				{ name: `:map:・__Location:__`, value: `> \`${(response.location ? response.location : "Unset")}\``, inline: true },
				{ name: `:incoming_envelope:・__E-Mail:__`, value: `> \`${(response.email ? response.email : "Unset")}\``, inline: true },
				{ name: `**X** - __X:__`, value: `> \`${(response.twitter_username ? `[${response.twitter_username}](https://twitter.com/${response.twitter_username })` : "Unset")}\``, inline: true },
				{ name: `:open_file_folder:・__Total Public repository:__`, value: `> [${response.public_repos}](${response.html_url}?tab=repositories)`, inline: true },
				{ name: `:busts_in_silhouette:・__Follower${response.followers > 1 ? "s" : ""}:__`, value: `> `, inline: true },
				{ name: `:bust_in_silhouette:・__Account created at:__`, value: `> \`${response.created_at}\``, inline: true },
				{ name: `:bust_in_silhouette:・__Account edited at:__`, value: `> \`${response.updated_at}\``, inline: true },
				{ name: `<:time:1205987554260684870>・__Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: false}
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