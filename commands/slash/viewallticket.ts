import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandSlash, Database as DatabaseInterface } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("viewalltickets")
	.setNameLocalizations({
		"en-US": "viewalltickets",
		fr: "voirtouslestickets"
	})
	.setDescription("Show you all of tickets of the server")
	.setDescriptionLocalizations({
		"en-US": "Show you all of tickets of the server",
		fr: "Vous montre tous les tickets du serveur"
	})
	.addUserOption(option =>
		option.setName("member")
		.setNameLocalizations({
			fr: "membre",
			"en-US": "member"
		})
		.setDescription("Member to ban")
		.setDescriptionLocalizations({
			fr: "Membre a bannir",
			"en-US": "Member to ban"
		})
		.setRequired(false)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("ModerateMembers") && interaction.member?.user.id !== client.config.ownerId) {
				require("./myticket").execute(interaction, client, reply);
				return;
			}
			const embed: EmbedBuilder = new EmbedBuilder()
			.setColor(0x00FF00)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
				url: "https://redeye.sleezzi.fr",
			})
			.setTitle(`Tickets • All`)
			.addFields(
				{ name: `<:time:1205987554260684870>・__Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: false}
			)
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string,
			});

			if (interaction.options.getUser("member")) {
				const member = interaction.guild?.members.cache.find((member) => member.id === interaction.options.getUser("member")?.id);
				embed.setTitle(`:ticket:・T-ickets • ${member?.user.username}`);
				const tickets: DatabaseInterface["server"]["tickets"]["user"] = await client.database.get(`/${interaction.guild?.id}/tickets/${member?.user.id}`);
				for (const [ticketId, ticket] of Object.entries(tickets)) {
					embed.addFields({name: `**\`${ticketId}\`**:`, value: `>・:book:・Content: **\`${ticket.content}\`**,\n>・Made at: <t:${ticket.madeAt}:R>${(ticket.updatedAt ? `,\n>・<:time:1205987554260684870>・Updated at: <t:${ticket.updatedAt}:R>` : "")}`});
				}
			} else {
				const users: DatabaseInterface["server"]["tickets"] = await client.database.get(`/${interaction.guild?.id}/tickets`);
				for (const [userId, tickets] of Object.entries(users)) {
					for (const [ticketId, ticket] of Object.entries(tickets)) {
						embed.addFields({
							name: `**\`${ticketId}\`**:`,
							value: `>・:book:・Content: **\`${ticket.content}\`**,\n>・Made at: <t:${ticket.madeAt}:R>${(ticket.updatedAt ? `,\n>・<:time:1205987554260684870>・Updated at: <t:${ticket.updatedAt}:R>` : "")}`
						});
					}
					embed.addFields({ name: `:ticket:・Tickets of ${interaction.guild?.members.cache.find(member => member.id === userId)?.user.username}:`, value: `||${userId}||` });
				}
			}
			reply({ embeds: [embed] });
		} catch(err) { return err; }
	}
}

module.exports = commandExport;