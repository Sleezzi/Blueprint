import { SlashCommandBuilder, User } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("pic")
	.setNameLocalizations({
		"en-US": "pic",
		fr: "pdp"
	})
	.setDescription("Displays a member's profile picture")
	.setDescriptionLocalizations({
		"en-US": "Displays a member's profile picture",
		fr: "Affiche la photo de profil d'un membre"
	})
	.addUserOption(option =>
		option.setName("member")
		.setNameLocalizations({
			fr: "membre",
			"en-US": "member"
		})
		.setDescription("Member")
		.setDescriptionLocalizations({
			fr: "Membre",
			"en-US": "Member"
		})
		.setRequired(false)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			let member = interaction.guild?.members.cache.find((m) => m.id === (interaction.options.getUser("member") as User ? interaction.options.getUser("member") as User : interaction.member?.user)?.id);
			reply(`[Picture of ${member?.user.username}](${(member?.user.avatarURL() ? member.user.avatarURL() : "https://discord.com/assets/c722e74f644b4a758b11.png")})` );
		} catch(err) { return err; }
	}
}

module.exports = commandExport;