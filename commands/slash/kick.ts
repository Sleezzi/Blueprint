import { SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("kick")
	.setNameLocalizations({
			"en-US": "kick",
			fr: "kick"
		})
	.setDescription("Kick a member")
	.setDescriptionLocalizations({
			"en-US": "Kick a member in server",
			fr: "Expulse un membre du serveur"
		})
	.setDefaultMemberPermissions(109_9511_627_776)
	.addUserOption(option =>
		option.setName("member")
		.setNameLocalizations({
			fr: "membre",
			"en-US": "member"
		})
		.setDescription("Member to kick")
		.setDescriptionLocalizations({
			fr: "Membre à expulser",
			"en-US": "Member to kick"
		},)
		.setRequired(true)
	)
	.addStringOption(option => 
		option.setName("reason")
		.setNameLocalizations({
			fr: "raison",
			"en-US": "reason"
		})
		.setDescription("The reason for the kick")
		.setDescriptionLocalizations({
			fr: "La raison de l'expuslement",
			"en-US": "The reason for the kick"
		})
		.setRequired(false)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			let member = interaction.guild?.members.cache.find((member) => member.id === interaction.options.getUser("member")?.id);

			if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("ModerateMembers")) {
				reply("You cannot kick a member from the server" );
				return;
			}
			if (!member) {
				reply("Please mention a valid member." );
				return;
			}
			if (interaction.member?.user.id === member.id) {
				await interaction.deleteReply();
				reply("You cannot kick yourself from the server" );
				return;
			}
			if (!member.bannable) {
				reply("I can't kick this member" );
				return;
			}

			let reason = interaction.options.getString("reason");

			await member.kick(`Reason: "${reason}", kick by: ${interaction.member?.user.username}`);
			reply(`**${member.user.tag}** was successfully kicked for the following reason: \`${(reason ? reason: "No reason specified")}\`` );
		} catch(err) { return err; }
	}
}

module.exports = commandExport;