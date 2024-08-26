import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Database as DatabaseInterface, CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("mytickets")
	.setNameLocalizations({
		"en-US": "mytickets",
		fr: "mestickets"
	})
	.setDescription("Shows you all your tickets")
	.setDescriptionLocalizations({
		"en-US": "Shows you all your tickets",
		fr: "Vous affiche tous vos tickets"
	})
	.setDefaultMemberPermissions(109_9511_627_776)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			const embed: EmbedBuilder = new EmbedBuilder()
			.setColor(0x00FF00)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
				url: "https://redeye.sleezzi.fr",
			})
			.setTitle(`Tickets • ${interaction.user.username}`)
			.addFields(
				{ name: `<:time:1205987554260684870>・__Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: false}
			)
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string,
			});
			const tickets: DatabaseInterface["server"]["tickets"]["user"] = await client.database.get(`/${interaction.guild?.id}/tickets/${interaction.member?.user.id}`);
			for (const [id, ticket] of Object.entries(tickets)) {
				embed.addFields({
					name: `<:ID:1200784630865985598>・**\`${id}\`**:`,
					value: `>・Content: "\`${ticket.content}\`",\n>・Made at: <t:${ticket.madeAt}:R>${(ticket.updatedAt ? `,\n>・Updated at: <t:${ticket.updatedAt}:R>` : "")}`
				});
			}
			reply({ embeds: [embed] });
		} catch(err) { return err; }
	}
}

module.exports = commandExport;