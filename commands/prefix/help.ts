import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, ComponentType, StringSelectMenuOptionBuilder } from "discord.js";
import { Database as DatabaseInterface, CommandPrefix } from "../../interfacies";


const commandExport: CommandPrefix = {
	name: "help",
	category: "Misc",
	async execute(message, client) {
		try {
			await message.channel.sendTyping();
			const serverData: DatabaseInterface["server"] = await client.database.get(`/${message.guild}`);
			const texts = client.translate(message.guild?.preferredLocale as string, "prefix/help");
			const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");

			let command: string | any = message.content.split(' ').slice(1)[0];
			if (command && command !== "help") {
				if (!client.commands.prefix.has(command)) {
					const msg = await message.channel.send({ content: `${command} ${texts.invalid}.` });
					if (message.deletable) message.delete();
					setTimeout(() => {
						try {
							msg.delete();
						} catch (err) {
							return err;
						}
					}, 5000);
					return;
				}
				command = client.commands.prefix.find(n => n.name === command);
				const embed = new EmbedBuilder()
					.setColor("Aqua")
					.setTitle(texts.help)
					.setDescription(`*${serverData.prefix ?? client.config.prefix}${command.name}*`)
					.setAuthor({ name: message.member?.user.tag as string, iconURL: message.member?.user.avatarURL() as string, url: message.url })
					.addFields(
						{ name: `<:nametag:1200757678104915978>・__**${globalsTexts.name}:**__`, value: `**\`${command.name}\`**`},
						{ name: `:book:・__**${globalsTexts.description}:**__`, value: `**\`${command.description ? command.description : client.translate(message.guild?.preferredLocale as string, `prefix/${command.name}`)._description}\`**`},
						{ name: `:unlock:・__**${texts.canBeUsed}:**__`, value: `${(command.permissions !== undefined ? (command.permissions === "Owner" && message.member?.id === client.config.ownerId ? "<a:yes:1205984539852144751>" : (message.member?.permissions.has(command.permissions) ? "<a:yes:1205984539852144751>" : "<a:no:1211019198881472622>")) : "<a:yes:1205984539852144751>")}`},
						{ name: `:question:・__**${texts.howToUse}:**__`, value: `${serverData.prefix ?? client.config.prefix}${command.model ? command.model : client.translate(message.guild?.preferredLocale as string, `prefix/${command.name}`)._model}`},
						{ name: `<:time:1205987554260684870>・__**${globalsTexts.date}:**__`, value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
					)
					.setURL(message.url)
					.setFooter({ text: `Id: ${message.id}`, iconURL: client.user?.avatarURL() as string });
				message.channel.send({ embeds: [embed] });
			} else {
				const mainEmbed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setAuthor({
					name: message.author.tag,
					iconURL: message.member?.user.avatarURL() as string,
					url: message.url,
				})
				.setTitle(`${texts.help} • ${texts.main}`)
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				})
				.addFields(
					{ name: `:keyboard:・__${texts.prefix}:__`, value: `> \`${(serverData.prefix || client.config.prefix)}\``, inline: false },
					{ name: `<:time:1205987554260684870>・__${texts.endIn}:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 120)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 120)}:R>)`, inline: true },
					{ name: `:robot:・__${texts.authorBot}:__`, value: `> [Sleezzi](https://sleezzi.fr/)`, inline: false },
					{ name: `:link:・__${texts.link}:__`, value: `> [${texts.dashboard}](https://manage-redeye.sleezzi.fr/) | [${texts.invite}](https://redeye.sleezzi.fr/invite) | [${texts.server}](https://redeye.sleezzi.fr/server) | [${texts.docs}](https://redeye.sleezzi.fr/docs)`, inline: false },
					{ name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true },
					{ name: `<:time:1205987554260684870>・__${texts.endIn}:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 120)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 120)}:R>)`, inline: true },
				);

				const moderationEmbed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setTitle(`${texts.help} • ${texts.moderation}`)
				.setAuthor({
					name: message.author.tag,
					iconURL: message.member?.user.avatarURL() as string,
					url: message.url,
				})
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});

				const gameEmbed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setTitle(`${texts.help} • ${texts.game}`)
				.setAuthor({
					name: message.author.tag,
					iconURL: message.member?.user.avatarURL() as string,
					url: message.url,
				}) 
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				
				const miscEmbed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setTitle(`${texts.help} • ${texts.misc}`)
				.setAuthor({
					name: message.author.tag,
					iconURL: message.member?.user.avatarURL() as string,
					url: message.url,
				})
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				if (!serverData.disabled) serverData.disabled = [];
				
				for (const command of client.commands.prefix.toJSON()) {
					if (serverData.disabled?.find(cmd => cmd === command.name) || !command) continue;
					if (!command.permissions) {
						if (command.category === "Moderation") {
							moderationEmbed.addFields({ name: `__**${command.name}:**__`, value: `**\`${command.description ? command.description : client.translate(message.guild?.preferredLocale as string, `prefix/${command.name}`)._description}\`**`})
						} else if (command.category === "Games") {
							gameEmbed.addFields({ name: `__**${command.name}:**__`, value: `**\`${command.description ? command.description : client.translate(message.guild?.preferredLocale as string, `prefix/${command.name}`)._description}\`**`})
						} else if (command.category === "Misc") {
							miscEmbed.addFields({ name: `__**${command.name}:**__`, value: `**\`${command.description ? command.description : client.translate(message.guild?.preferredLocale as string, `prefix/${command.name}`)._description}\`**`})
						}
					} else if (command.permissions === "Owner") {
						if (message.member?.id !== client.config.ownerId) continue;
						if (command.category === "Moderation") {
							moderationEmbed.addFields({ name: `__**${command.name}:**__`, value: `**\`${command.description ? command.description : client.translate(message.guild?.preferredLocale as string, `prefix/${command.name}`)._description}\`**`})
						} else if (command.category === "Games") {
							gameEmbed.addFields({ name: `__**${command.name}:**__`, value: `**\`${command.description ? command.description : client.translate(message.guild?.preferredLocale as string, `prefix/${command.name}`)._description}\`**`})
						} else if (command.category === "Misc") {
							miscEmbed.addFields({ name: `__**${command.name}:**__`, value: `**\`${command.description ? command.description : client.translate(message.guild?.preferredLocale as string, `prefix/${command.name}`)._description}\`**`})
						}
					} else if (message.member?.permissions.has(command.permissions as any)) {
						if (command.category === "Moderation") {
							moderationEmbed.addFields({ name: `__**${command.name}:**__`, value: `**\`${command.description ? command.description : client.translate(message.guild?.preferredLocale as string, `prefix/${command.name}`)._description}\`**`})
						} else if (command.category === "Games") {
							gameEmbed.addFields({ name: `__**${command.name}:**__`, value: `**\`${command.description ? command.description : client.translate(message.guild?.preferredLocale as string, `prefix/${command.name}`)._description}\`**`})
						} else if (command.category === "Misc") {
							miscEmbed.addFields({ name: `__**${command.name}:**__`, value: `**\`${command.description ? command.description : client.translate(message.guild?.preferredLocale as string, `prefix/${command.name}`)._description}\`**`})
						}
					}
				}
				const select = new StringSelectMenuBuilder()
				.setCustomId(texts.commandType)
				.setPlaceholder(texts.commandTypeDescription)
				.addOptions([
					new StringSelectMenuOptionBuilder()
					.setLabel(texts.defaultSelect)
					.setValue('none')
					.setDefault(true),
					
					new StringSelectMenuOptionBuilder()
					.setLabel(texts.main)
					.setValue('main'),
					
					new StringSelectMenuOptionBuilder()
					.setLabel(texts.moderation)
					.setValue('moderation'),
					
					new StringSelectMenuOptionBuilder()
					.setLabel(texts.misc)
					.setValue('misc'),
					
					new StringSelectMenuOptionBuilder()
					.setLabel(texts.game)
					.setValue('game')
				]);
				
				const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
				let reply = await message.channel.send({ embeds: [ mainEmbed ], components: [ row ] });
				let collector = reply.createMessageComponentCollector({ componentType: ComponentType.StringSelect, filter: (i: any) => i.user.id === message.member?.user.id});
				
				collector.on("collect", async (interaction: StringSelectMenuInteraction) => {
					try {
						console.log("collected", interaction.values[0]);
						
						const msg = await interaction.reply({ content: `<a:loading:1204754788055646218>・${texts.wait}`, ephemeral: true });
						if (interaction.values[0] === "main") {
							reply.edit({ embeds: [ mainEmbed ], components: [ row ] });
						}
						if (interaction.values[0] === "moderation") {
							reply.edit({ embeds: [ moderationEmbed ], components: [ row ] });
						}
						if (interaction.values[0] === "game") {
							reply.edit({ embeds: [ gameEmbed ], components: [ row ] });
						}
						if (interaction.values[0] === "misc") {
							reply.edit({ embeds: [ miscEmbed ], components: [ row ] });
						}
						msg.delete();
					} catch (err) {
						console.error(err);
					}
				});
				collector.once("end", () => {
					try {
						reply.delete();
					} catch (err) {
						console.error(err);
					}
				});
			}
			if (message && message.deletable) message.delete();
		} catch(err) {
			console.error(err);
		}
	}
}
module.exports = commandExport;