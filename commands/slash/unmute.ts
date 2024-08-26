import { SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("unmute")
	.setNameLocalizations({
		"en-US": "unmute",
		fr: "demute"
	})
	.setDescription("Mute a member")
	.setDescriptionLocalizations({
		"en-US": "Unmute a member in server",
		fr: "Redonne la parole a un membre du serveur"
	})
	.setDefaultMemberPermissions(109_9511_627_776)
	.addUserOption(option =>
		option.setName("member")
		.setNameLocalizations({
			fr: "membre",
			"en-US": "member"
		})
		.setDescription("Member to unmute")
		.setDescriptionLocalizations({
			fr: "Membre a qui il faut rendre la parole",
			"en-US": "Member to unmute"
		})
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			
			let member = interaction.guild?.members.cache.find((member) => member.id === interaction.options.getUser("member")?.id);
			if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("ModerateMembers")) {
				reply("You can't unmute this member" );
				return;
			}

			if (interaction.member?.user.id === member?.user.id) {
				reply("You can't unmute yourself" );
				return;
			}
			
			if (!member?.manageable) {
				reply("I can't unmute this member" );
				return;
			}
			if (!member.roles.cache.find(role => role.name === "mute")) {
				reply("I can't unmute this member cause he is not mute" );
				return;
			}
			member.roles.remove(member.roles.cache.find(role => role.name === "mute")?.id as string);
			reply("This member has been unmuted" );
		} catch(err) { return err; }
	}
}

module.exports = commandExport;