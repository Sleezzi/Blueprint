import { GuildMember, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("mute")
	.setNameLocalizations({
		"en-US": "mute",
		fr: "mute"
	})
	.setDescription("Mute a member")
	.setDescriptionLocalizations({
		"en-US": "Mute a member in server",
		fr: "Rend muet un membre du serveur"
	})
	.setDefaultMemberPermissions(109_9511_627_776)
	.addUserOption(option =>
		option.setName("member")
		.setNameLocalizations({
			fr: "membre",
			"en-US": "member"
		})
		.setDescription("Member to mute")
		.setDescriptionLocalizations({
			fr: "Membre a rendre muet",
			"en-US": "Member to mute"
		})
		.setRequired(true)
	)
	.addNumberOption(option =>
		option.setName("duration")
		.setNameLocalizations({
			fr: "durer",
			"en-US": "duration"
		})
		.setDescription("The duration of the mute")
		.setDescriptionLocalizations({
			fr: "Le temps que le membre doit être mute",
			"en-US": "The duration of the mute"
		})
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			let member: GuildMember = interaction.guild?.members.cache.find((member) => member.id === interaction.options.getUser("member")?.id) as GuildMember;
			if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("ModerateMembers")) {
				reply("You can't mute this member", );
				return;
			}

			if (interaction.member?.user.id === member?.user.id) {
				reply("You can't mute yourself" );
				return;
			}
			
			if (!member.manageable) {
				reply("I can't mute this member" );
				return;
			}
			if (member.roles.cache.find((role: any) => role.name === "mute" && role.color === 0xFF0000 && role.permissions.length === 0)) {
				reply("I can't mute this member cause he is already mute" );
				return;
			}
			
			member.timeout(interaction.options.getNumber("duration") as number * 1_000);
			reply("This member has been muted" );
		} catch(err) { return err; }
	}
}

module.exports = commandExport;