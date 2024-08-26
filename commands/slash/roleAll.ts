import { SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("roleall")
	.setNameLocalizations({
		"en-US": "roleall",
		fr: "roletous"
	})
	.setDescription("Give/remove a role to all server members")
	.setDescriptionLocalizations({
		"en-US": "Give/remove a role to all server members",
		fr: "Donne/retire un role a tous les membres du serveur"
	})
	.addRoleOption(option => 
		option.setName("role")
		.setNameLocalizations({
			"en-US": "role",
			fr: "role"
		})
		.setDescription("The role given/removed from the member")
		.setDescriptionLocalizations({
			"en-US": "The role given/removed from the member",
			fr: "Le role a donné/retiré au membre"
		})
		.setRequired(true)
	)
	.addStringOption(option => 
		option.setName("action")
		.setNameLocalizations({
			"en-US": "action",
			fr: "action"
		})
		.setDescription("What the bot should do")
		.setDescriptionLocalizations({
			"en-US": "What the bot should do",
			fr: "Ce que le bot doit faire"
		})
		.addChoices(
			{
				name: "add",
				name_localizations: {
					"en-US": "add",
					fr: "ajouter"
				},
				value: "add"
			},
			{
				name: "remove",
				name_localizations: {
					"en-US": "remove",
					fr: "retirer"
				},
				value: "remove"
			}
		)
		.setRequired(true)
	)
	.setDefaultMemberPermissions(109_9511_627_776)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			const texts = client.translate(interaction.guild?.preferredLocale as string, "slash/roleAll");
			console.log(texts);
			
			if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("Administrator")) {
				reply(`<a:no:1211019198881472622>・<@${interaction.member?.user.id}>, ${texts.userMissingPerm}`);
				return;
			}
			const role = interaction.options.getRole("role");
			if (role?.managed) {
				reply(`${texts.invalidRole}`);
				return;
			}

			let count = 0;
			if (interaction.options.getString("action") === "add") {
				interaction.guild.members.cache.toJSON().forEach(member => {
					if (!member.manageable ||
						member.roles.cache.has(role?.id as string) ||
						member.user.bot
					) return;
					member.roles.add(role?.id as string);
					count++;
				});

				reply(`<a:yes:1205984539852144751>・${texts.givenSuccess1} ${count} ${texts.success2}`);
				return;
			}

			if (interaction.options.getString("action") === "remove") {
				interaction.guild.members.cache.toJSON().forEach(member => {
					if (!member.manageable ||
						!member.roles.cache.has(role?.id as string) ||
						member.user.bot
					) return;
					member.roles.remove(role?.id as string);
					count++;
				});

				reply(`<a:yes:1205984539852144751>・${texts.removedSuccess1} ${count} ${texts.success2}`);
				return;
			}
		} catch(err) { return err; }
	}
}

module.exports = commandExport;