import { EmbedBuilder, Interaction } from "discord.js";
import { CommandSlash, Database as DatabaseInterface, Event } from "../interfacies";
import { Log } from "../components";

const event: Event = {
	name: "AppCommandsHandler",
	event: "interactionCreate", // When someone places an commands
	type: "on",
	async execute([interaction]: [Interaction], client) {
		try {
			if (!interaction.isChatInputCommand() && !interaction.isUserContextMenuCommand() && !interaction.isMessageContextMenuCommand()) return;

			const texts = client.translate(interaction.guild?.preferredLocale as string, `events/AppCommandsHandler`);
			const globalsTexts = client.translate(interaction.guild?.preferredLocale as string, `globals/globals`);

			const command = client.commands.app.get(interaction.commandName) as CommandSlash;
			if (!command) {
				const embed = new EmbedBuilder()
				.setColor(0xff0000)
				.setTitle(`Error`)
				.addFields(
					{ name: `<:error:1205982398429532280>・${texts.error}`, value: '\u200B', inline: false },
					{ name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: true}
				)
				.setFooter({
					text: `Id: ${interaction.id}`,
					iconURL: client.user?.avatarURL() as string,
				})
				interaction.reply({ embeds: [embed], ephemeral: true });
				return;
			}
			new Log(`%aqua%${interaction.member?.user.username.toUpperCase()}%reset% used the app command %yellow%${command.data.name}%reset% on server %aqua%${interaction.guild?.name}%reset% (%gray%${interaction.guild?.id}%reset%)`); // Log
			
			let disabled: DatabaseInterface["server"]["disabled"] = await client.database.get(`/${interaction.guild?.id}/disabled`); // Retrieve the list of disabled commands
			if (disabled![0]) { // Check if there are
				if (disabled?.find((c: any) => c === command)) { // Check if the server has disabled the command
					const embed = new EmbedBuilder()
					.setColor(0xff0000)
					.setTitle(`Error`)
					.addFields(
						{
							name: `<a:no:1211019198881472622>・${texts.disable}.`,
							value: '\u200B',
							inline: false
						},
						{
							name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`,
							value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`,
							inline: true
						}
					)
					.setFooter({
						text: `Id: ${interaction.id}`,
						iconURL: client.user?.avatarURL() as string,
					})
					interaction.editReply({ embeds: [embed] }); // send message to warn the user about the disabled command
					return; // End here
				}
			}
			const embed = new EmbedBuilder()
			.setColor(0xBF94FF)
			.setAuthor({
					name: interaction.member?.user.username as string,
					iconURL: interaction.guild?.members.cache.get(interaction.member?.user.id as string)?.user.avatarURL() as string,
					url: "https://redeye.sleezzi.fr",
				})
			.setTitle(`<a:loading:1204754788055646218>・${texts.wait} ${texts.loading[Math.floor(Math.random() * texts.loading.length)]}`)
			.setFooter({
				text: `Id: ${interaction.id}`,
				iconURL: client.user?.avatarURL() as string,
			})
			if (command.loadingMessage !== false) {
				await interaction.reply({ embeds: [embed], ephemeral: true }); // Send a loading message
			}
			
			const err = await command.execute(interaction as any, client, (response: any) => {
				try {
					if (!response) return;
					if (command.loadingMessage === false) return interaction.reply(response);
					if (typeof response === "object") {
						if (response.embeds) return interaction.editReply(response);
						response.embeds = [];
						return interaction.editReply(response);
					}
					return interaction.editReply({ content: response, embeds: [] });
				} catch (err) { console.error(err); }
			}); // Calls the "execute" function present in the command file and recovers errors
			if (err) { // Check for errors
				const embed: EmbedBuilder = new EmbedBuilder()
				.setColor(0xff0000)
				.setTitle(`Error`)
				.addFields(
					{
						name: `<:error:1205982398429532280>・${texts.error}`,
						value: texts.errorReply[Math.floor(Math.random() * texts.errorReply.length)],
						inline: false
					},
					{
						name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`,
						value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`,
						inline: true
					}
				)
				.setFooter({
					text: `Id: ${interaction.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				
				interaction.editReply({ embeds: [embed] }); // Sends a message to notify the user that an error has occurred
				console.error(err); // Log the error
			}
		} catch(err) { console.error(err); } // Catch errors and send them to the console
	}
}

module.exports = event;