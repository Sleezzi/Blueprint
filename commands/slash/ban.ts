import { GuildMember, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("ban")
	.setNameLocalizations({
		"en-US": "ban",
		fr: "ban"
	})
	.setDescription("Ban a member")
	.setDescriptionLocalizations({
		"en-US": "Ban a member in server",
		fr: "Bannie un membre du serveur"
	})
	.addUserOption(option => 
		option.setName("member")
		.setNameLocalizations({
			fr: "membre",
			"en-US": "member"
		})
		.setDescription("Member to ban")
		.setDescriptionLocalizations({
			fr: "Membre à bannir",
			"en-US": "Member to ban"
		})
		.setRequired(true)
	)
	.addStringOption(option => 
		option.setName("duration")
		.setNameLocalizations({
			fr: "durée",
			"en-US": "duration"
		})
		.setDescription("The duration of the ban (in sec)")
		.setDescriptionLocalizations({
			fr: "La durée du bannisement (en seconde)",
			"en-US": "The duration of the ban (in sec)"
		})
		.setRequired(true)
	)
	.addStringOption(option => 
		option.setName("reason")
		.setNameLocalizations({
			fr: "raison",
			"en-US": "reason"
		})
		.setDescription("The reason for the ban")
		.setDescriptionLocalizations({
			fr: "La raison du bannissement",
			"en-US": "The reason for the ban"
		})
		.setRequired(false)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			let member: GuildMember = interaction.guild?.members.cache.find((member) => member.id === interaction.options.getUser("member")?.id) as GuildMember;

			if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("BanMembers")) {
				reply('You cannot ban a member from the server' );
				return;
			}
			if (!member) {
				reply("Please mention a valid member." );
				return;
			}
			if (interaction.member?.user.id === member.id) {
				reply("You cannot ban yourself from the server" );
				return;
			}
			if (!member.bannable) {
				reply("I can't ban this member" );
				return;
			}

			let duration: string = interaction.options.getString("duration") as string;
			let reason: string = interaction.options.getString("reason") as string;

			if (!duration) {
				duration = "Perm";
			} else duration = duration;

			await member.ban({ reason: `Reason: "${reason}", ban by: ${interaction.member?.user.username}` });
			reply(`${member.user.tag} was successfully banned for the following reason: \`${(reason ? reason : "No reason specified")}\` and for a period of \`${duration}s\`` );
			if (duration) { // If duration
				setTimeout(() => {
					interaction.guild?.members.unban(member);
				}, parseInt(duration));
			}
		} catch(err) { return err; }
	}
}

module.exports = commandExport;