import { ColorResolvable, EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import { Modal } from "../interfacies";

const moduleExport: Modal = {
	name: "Embed",
	customId: "embedbuilder",
	execute(interaction, client) {
		try {
			const channel = (interaction.guild?.channels.cache.get(interaction.fields.getTextInputValue("channel")) as TextChannel);
			if (!channel.permissionsFor(interaction.member as GuildMember).has("SendMessages")) {
				interaction.reply({ content: "<a:no:1211019198881472622>・You cannot send messages in this channel", ephemeral: true });
				return;
			}
			const embed = new EmbedBuilder()
			.setAuthor({
				name: interaction.member?.user.username as string,
				iconURL: `https://cdn.discordapp.com/avatars/${interaction.guild?.id}/${interaction.member?.user.avatar}`,
				url: interaction.channel?.url
			});
			if (interaction.fields.getTextInputValue("title")) embed.setTitle(interaction.fields.getTextInputValue("title"));
			if (interaction.fields.getTextInputValue("description")) embed.setDescription(interaction.fields.getTextInputValue("description"));
			if (interaction.fields.getTextInputValue("image")) embed.setImage(interaction.fields.getTextInputValue("image"));
			if (interaction.fields.getTextInputValue("color")) {
				if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(interaction.fields.getTextInputValue("color"))) {
					embed.setColor(interaction.fields.getTextInputValue("color") as ColorResolvable);
				} else {
					embed.setColor("DarkPurple");
				}
			}
			channel?.send({ embeds: [ embed ] });
			interaction.reply({ content: "Send!", ephemeral: true });
		} catch (err) { console.error(err); }
	}
}

module.exports = moduleExport;