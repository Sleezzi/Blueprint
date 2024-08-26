import { SlashCommandBuilder, TextChannel } from "discord.js";
import { CommandSlash } from "../../interfacies";
import { EmbedBuilder } from "@discordjs/builders";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("clear")
	.setNameLocalizations({
		"en-US": "clear",
		fr: "clear"
	})
	.setDescription("Delete messages in the channel in which the command is used")
	.setDescriptionLocalizations({
		"en-US": "Delete messages in the channel in which the command is used",
		fr: "Supprime des messages dans le salon où la commande est utilisé"
	})
	.setDefaultMemberPermissions(8_192)
	.addNumberOption(option => 
		option.setName("number")
		.setNameLocalizations({
			fr: "numbre",
			"en-US": "number"
		})
		.setDescription("Number of messages to delate")
		.setDescriptionLocalizations({
			fr: "Nombre de messages a supprimer",
			"en-US": "The number of messages to delate"
		})
		.setRequired(true)
	)
	.addUserOption(option => 
		option.setName("member")
		.setNameLocalizations({
			fr: "membre",
			"en-US": "member"
		})
		.setDescription("Delete all messages from the member")
		.setDescriptionLocalizations({
			fr: "Supprimer tous les messages du membre",
			"en-US": "Delete all messages from the member"
		})
		.setRequired(false)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("ManageMessages")) {
			const embed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setTitle("<a:no:1211019198881472622>・You do not have permission to delete messages")
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
				url: "https://redeye.sleezzi.fr",
			})
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string,
			})
			reply({ embeds: [embed] });
			return;
		}
		let amount = interaction.options.getNumber("number");
		if (!amount) {
			const embed = new EmbedBuilder()
			.setColor(0xFF0000)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
				url: "https://redeye.sleezzi.fr",
			})
			.setTitle("<a:no:1211019198881472622>・You must specify a number of messages to delete")
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string,
			});
			reply({ embeds: [embed] });
			return;
		}
		
		if (amount > 100) amount = 100;
		try {
			const messages: any = await interaction.channel?.messages.fetch({ limit: amount })
			.then(messages => messages.filter((msg) => 1_209_600_000 > Date.now() - (msg.createdAt as any) && msg.bulkDeletable && (!interaction.options.getUser("member") || msg.member?.id === interaction.options.getUser("member")?.id)));
			await (interaction.channel as TextChannel)?.bulkDelete(messages);
			const embed: EmbedBuilder = new EmbedBuilder()
			.setColor(0xFF0000)
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
				url: "https://redeye.sleezzi.fr",
			})
			.setTitle(`<a:trash:1213524421621448756>・${(messages.size) > 1 ? "Multiple " : ""}Messages Deleted (${messages.size} message${messages.size > 1 ? "s" : ""})`)
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string,
			});
			reply({ embeds: [embed] });
		} catch(err) { return {err, line: 68, file: "/commands/slash/clear.js"}; }
	}
}

module.exports = commandExport;