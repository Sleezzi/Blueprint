import { SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("setprefix")
	.setNameLocalizations({
		"en-US": "setprefix",
		fr: "setprefix"
	})
	.setDescription("Change the bot prefix on this server")
	.setDescriptionLocalizations({
		"en-US": "Change the bot prefix on this server",
		fr: "Change le prefixe du bot sur ce serveur"
	})
	.addStringOption(option =>
		option.setName("prefix")
		.setNameLocalizations({
			fr: "prefix",
			"en-US": "prefix"
		})
		.setDescription("The prefix")
		.setDescriptionLocalizations({
			fr: "Le préfix",
			"en-US": "The prefix"
		})
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			const texts = client.translate(interaction.guild?.preferredLocale as string, "slash/roleAll");
			if (!interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.permissions.has("Administrator")) {
				reply(`<a:no:1211019198881472622>・${texts.missingPermission}` );
				return;
			}
			const prefix = interaction.options.getString("prefix");
			if (!prefix || prefix.length > 3 || /`|\(|\)|#|\*|:|\|| /.test(prefix)) {
				reply(`${texts.invalid}`);
				return;
			}
			if (prefix === client.config.prefix) {
				client.database.delete(`/${interaction.guild?.id}/prefix`);
			} else {
				client.database.set(`/${interaction.guild?.id}/prefix`, prefix);
			}
			reply(`${texts.success}`);
		} catch(err) { return err; }
	}
}

module.exports = commandExport;