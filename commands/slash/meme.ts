import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("meme")
	.setNameLocalizations({
			"en-US": "meme",
			fr: "meme"
		})
	.setDescription("Send a random meme image")
	.setDescriptionLocalizations({
			"en-US": "Send a random meme image",
			fr: "Envoyer une image mème aléatoire"
		})
	.setNSFW(false),
	async execute(interaction, client, reply) {
		const theme = interaction.options.getString("theme");
		try {
			let response: any = await fetch(`https://api.imgflip.com/get_memes`, { method: "GET", referrer: "https://redeye.sleezzi.fr/", });
			if (response.status === 200) {   
				response = await response.json();
				const memes = response.data.memes[Math.floor(Math.random() * response.data.memes.length)];
				const embed: EmbedBuilder = new EmbedBuilder()
				.setColor(0x0099ff)
				.setAuthor({
					name: interaction.member?.user.username as string,
					iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
					url: "https://redeye.sleezzi.fr",
				})
				.setTitle('<a:ho:1211066398621831228>・Meme')
				.setURL("https://redeye.sleezzi.fr")
				.setImage(memes.url)
				.addFields(
					{ name: "Title", value: memes.name },
					{ name: "URL", value: `\`${memes.url}\`` },
					{ name: "ID", value: `\`${memes.id}\`` }
				)
				.setFooter({
					text: `Id: ${interaction.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				await reply({ embeds: [embed] });
			} else {
				await reply('Unable to find a meme' );
				return response.status;
			}
		} catch(err) { return err; }
	}
}

module.exports = commandExport;