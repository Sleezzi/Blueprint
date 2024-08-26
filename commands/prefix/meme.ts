import { EmbedBuilder, Message } from "discord.js";
import { CommandPrefix } from "../../interfacies";

const command: CommandPrefix = {
	name: "meme",
	description: "Send a random meme image",
	model: `image **\`the theme of the image\`**`,
	category: "Misc",
	async execute(message, client) {
		await message.channel.sendTyping();
		try {
			let response: any = await fetch(`https://api.imgflip.com/get_memes`, { method: "GET", referrer: "https://redeye.sleezzi.fr/", });
			if (response.status === 200) {   
				response = await response.json();
				const memes: { name: string, url: string, id: string } = response.data.memes[Math.floor(Math.random() * response.data.memes.length)];
				const embed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setAuthor({
					name: message.author.tag,
					iconURL: message.member?.user.avatarURL() as string,
					url: message.url,
				})
				.setTitle('<a:ho:1211066398621831228>・Meme')
				.setImage(memes.url)
				.addFields(
					{ name: "Title", value: memes.name },
					{ name: "URL", value: `\`${memes.url}\`` },
					{ name: "ID", value: `\`${memes.id}\`` }
					)
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				const msg: Message = await message.channel.send({ embeds: [embed] });
				setTimeout(async () => {
					try {
						msg.delete();
					} catch(err) { return err; }
				}, 25_000);
			} else {
				const msg: Message = await message.channel.send({ content: 'Unable to find an image on this topic' });
				setTimeout(async () => {
					try {
						msg.delete();
					} catch(err) { return err; }
				}, 5_000);
				console.error(response.status);
			}
		} catch(err) {
			const msg: Message = await message.channel.send({ content: 'An error occurred while retrieving the image' });
			setTimeout(async () => {
				try {
					msg.delete();
				} catch(err) { return err; }
			}, 5_000);
			console.error(err);
		}
		if (message && message.deletable) message.delete();
	}
}

module.exports = command;