import { SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("image")
	.setNameLocalizations({
		"en-US": "image",
		fr: "image"
	})
	.setDescription("Send a photo on a specific theme (may not work properly)")
	.setDescriptionLocalizations({
		"en-US": "Send a photo on a specific theme (may not work properly)",
		fr: "Envoie une photo sur un thème précie (peut ne pas fonctionner correctement)"
	})
	.setDefaultMemberPermissions(32_768)
	.addStringOption(option => 
		option.setName("theme")
		.setNameLocalizations({
			"en-US": "theme",
			fr: "theme"
		})
		.setDescription("The theme of the image")
		.setDescriptionLocalizations({
			"en-US": "The theme of the image",
			fr: "Le thème de l'image"
		})
		.setRequired(true)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		const theme = interaction.options.getString("theme");
		try {
			const response = await fetch(`https://source.unsplash.com/1920x1080/?${theme}`);
			
			if (response.ok) {
				const msg = await reply(`We found that with “UNSPLASH”, is that what you wanted? ${response.url}` );
				if (msg?.deletable) {
					setTimeout(() => {
						msg.delete();
					}, 60_000);
				}
			} else {
				reply('Unable to find an image on this topic' );
			}
		} catch(err) {
			await interaction.deleteReply();
			reply("An error occurred while retrieving the image" );
			return err;
		}
	}
}

module.exports = commandExport;