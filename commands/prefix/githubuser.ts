import { EmbedBuilder } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "githubuser",
	description: "Gives you information about a member or about you",
	model: `level *\`member\`*`,
	category: "Misc",
	async execute(message, client) {
		try {
			await message.channel.sendTyping();
			
			const texts = client.translate(message.guild?.preferredLocale as string, "prefix/githubuser");
			const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");
			
			let user = message.content.split(' ').slice(1)[0];
			let response: any = await fetch(`https://api.github.com/users/${user}`)
			if (response.status === 200) {
				response = await response.json();
				const embed: EmbedBuilder = new EmbedBuilder()
				.setColor(0x0099ff)
				.setAuthor({
					name: message.author.tag,
					iconURL: message.member?.user.avatarURL() as string,
					url: message.url,
				})
				.addFields(
						{ name: `<:nametag:1200757678104915978>・__${globalsTexts.name}:__`, value: `> \`${response.login}\``, inline: true },
						{ name: `<:ID:1200784630865985598>・__Id:__`, value: `> \`${response.id}\``, inline: true },
						{ name: `:camera:・__${texts.avatar}:__`, value: `> [Image](${response.avatar_url})`, inline: true },
						{ name: `:book:・__${texts.bio}:__`, value: `> \`${(response.bio ? response.bio : "Unset")}\``, inline: true },
						{ name: `:link:・__URL:__`, value: `> [${response.login}](${response.html_url})`, inline: true },
						{ name: `:necktie:・__${texts.company}:__`, value: `> \`${(response.company ? response.company : "Unset")}\``, inline: true },
						{ name: `:globe_with_meridians:・__${texts.website}:__`, value: `> ${(response.blog ? `[Click](${response.blog})` : "`Unset`")}`, inline: true },
						{ name: `:gear:・__${globalsTexts.type}:__`, value: `> \`${response.type}\``, inline: true },
						{ name: `:map:・__${texts.location}:__`, value: `> \`${(response.location ? response.location : "Unset")}\``, inline: true },
						{ name: `:incoming_envelope:・__${globalsTexts.email}:__`, value: `> \`${(response.email ? response.email : "Unset")}\``, inline: true },
						{ name: `**X** - __X:__`, value: `> \`${(response.twitter_username ? `[${response.twitter_username}](https://twitter.com/${response.twitter_username })` : "Unset")}\``, inline: true },
						{ name: `:open_file_folder:・__${texts.repository}:__`, value: `> [${response.public_repos}](${response.html_url}?tab=repositories)`, inline: true },
						{ name: `:busts_in_silhouette:・__${response.followers > 1 ? texts.followers : texts.follower}:__`, value: `> `, inline: true },
						{ name: `:bust_in_silhouette:・__${texts.created}:__`, value: `> \`${response.created_at}\``, inline: true },
						{ name: `:bust_in_silhouette:・__${texts.edited}:__`, value: `> \`${response.updated_at}\``, inline: true },
						{ name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
					)
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});

				message.channel.send({ embeds: [ embed ] });
			} else message.channel.send({ content: `Unable to find "${user}"` });
			if (message && message.deletable) message.delete();
		} catch(err) { return err; }
	}
}
module.exports = command;