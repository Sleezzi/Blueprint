import { EmbedBuilder, GuildMember, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("banlist")
	.setNameLocalizations({
		"en-US": "banlist",
		fr: "banliste"
	})
	.setDescription("Returns the list of all banned members from the server")
	.setDescriptionLocalizations({
		"en-US": "Returns the list of all banned members from the server",
		fr: "Renvoie la liste de tout les membres bannie du serveur"
	})
	.setDefaultMemberPermissions(109_9511_627_776)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			const embed: EmbedBuilder = new EmbedBuilder()
			.setColor(0x0099ff)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.avatarURL() as string,
				url: "https://redeye.sleezzi.fr",
			})
			.setTitle("<a:ban:1205986766687965276>・Ban list")
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string,
			});

			let bannedMember: any;
			await interaction.guild?.bans.fetch().then((bans) => bannedMember = bans.filter((user) => user.user));
			for (const user of bannedMember.filter((u: GuildMember) => u.user)) embed.addFields({ name: `> <:nametag:1200757678104915978> \`${user[1].user.tag}\` (${user[1].user.id})`, value: `:book: Reason: \`${user[1].reason}\``, inline: true});
			embed.setDescription(`Total banned member: \`${bannedMember.size}\``);
			reply({ embeds: [embed] });
		} catch(err) { return err; }
	}
}

module.exports = commandExport;