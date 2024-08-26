import { ActionRowBuilder, CacheType, ChatInputCommandInteraction, ComponentType, EmbedBuilder, InteractionCollector, PermissionResolvable, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { Database as DatabaseInterface, Client, CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("help")
	.setNameLocalizations({
		"en-US": "help",
		fr: "aide"
	})
	.setDescription("Shows you the help menu")
	.setDescriptionLocalizations({
		"en-US": "Shows you the help menu",
		fr: "Ouvre le menu d'aide"
	})
	.addStringOption(option => 
		option.setName("command")
		.setNameLocalizations({
			fr: "commande",
			"en-US": "command"
		})
		.setDescription("Which command do you need help with?")
		.setDescriptionLocalizations({
			fr: "Tu as besoin d'aide sur quelle commande ?",
			"en-US": "Which command do you need help with?"
		})
		.setRequired(false)
	)
	.setNSFW(false),
	async execute(message, client, reply) {
		try {
			let command: any = message.options.getString("command");
			if (command) {
				if (!client.commands.app.get(command)) {
					reply(`/${command} is not a command.` );
					return;
				}
				command = client.commands.app.get(command)?.data;
				let embed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setAuthor({
					name: message.guild?.members.cache.get(message.member?.user.id as string)?.user.username as string,
					iconURL: message.guild?.members.cache.get(message.member?.user.id as string)?.user.avatarURL() as string,
					url: "https://redeye.sleezzi.fr"
				})
				.setTitle('Help')
				.setDescription(`*/${command.name}*`)
				.addFields(
					{ name: "<:nametag:1200757678104915978>・__**Name:**__", value: `**\`${command.name}\`**`},
					{ name: ":book:・__**Description:**__", value: `**\`${command.description}\`**`},
					{ name: ":gear:・__**Options:**__", value: `\u200B`}
				)
				.setURL("https://redeye.sleezzi.fr")
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string
				});
				
				if (command.options) command.options.forEach((option: any) => {
					embed.addFields({
						name: `\`${option.name}\` (${option.required ? "required" : "optional"})`,
						value: option.description,
						inline: true
					});
				});
				embed.addFields({ name: "<:time:1205987554260684870>・____**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`});
				reply({ embeds: [embed] });
			} else {
				let serverData: DatabaseInterface["server"] = await client.database.get(`/${message.guild?.id}`);
				const mainEmbed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setAuthor({
					name: message.member?.user.username as string,
					iconURL: message.guild?.members.cache.get(message.member?.user.id as string)?.user.avatarURL() as string,
					url: "https://redeye.sleezzi.fr",
				})
				.setTitle('Help • Main')
				.addFields(
					{ name: `:keyboard:・__Prefix:__`, value: `> \`${(serverData.prefix || client.config.prefix)}\``, inline: false },
					{ name: `:robot:・__Bot made by:__`, value: `> [Sleezzi](https://sleezzi.fr/)`, inline: false },
					{ name: `<:time:1205987554260684870>・__Date:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true },
					{ name: `<:time:1205987554260684870>・__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 120)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 120)}:R>)`, inline: true }
				)
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				
				const moderationEmbed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setAuthor({
					name: message.member?.user.username as string,
					iconURL: message.guild?.members.cache.get(message.member?.user.id as string)?.user.avatarURL() as string,
					url: "https://redeye.sleezzi.fr",
				})
				.setTitle('Help • Moderation')
				.addFields(
					{ name: `<:time:1205987554260684870>・__Date:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
					{ name: `<:time:1205987554260684870>・__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 40)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 40)}:R>)`, inline: true}
				)
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				
				const funEmbed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setAuthor({
					name: message.member?.user.username as string,
					iconURL: message.guild?.members.cache.get(message.member?.user.id as string)?.user.avatarURL() as string,
					url: "https://redeye.sleezzi.fr",
				})
				.setTitle('Help • Game')
				.addFields(
					{ name: `<:time:1205987554260684870>・__Date:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
					{ name: `<:time:1205987554260684870>・__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 40)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 40)}:R>)`, inline: true}
				)
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				
				const miscEmbed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setAuthor({
					name: message.member?.user.username as string,
					iconURL: message.guild?.members.cache.get(message.member?.user.id as string)?.user.avatarURL() as string,
					url: "https://redeye.sleezzi.fr"
				})
				.setTitle('Help • Misc')
				.addFields(
					{ name: `<:time:1205987554260684870>・__Date:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
					{ name: `<:time:1205987554260684870>・__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 40)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 40)}:R>)`, inline: true}
				)
				.setFooter({
					text: `Id: ${message.id}`,
					iconURL: client.user?.avatarURL() as string,
				});
				
				for (const data of client.commands.prefix.toJSON()) {
					if (serverData.disabled?.length as number > 1 && serverData.disabled?.find((cmd: any) => cmd === data.name)) continue;
					if (!data.permissions) {
						if (data.category === "Moderation") {
							moderationEmbed.addFields({ name: `__**${data.name}:**__`, value: `**\`${(data.description !== "" ? data.description : "This command doesn't have a description")}\`**`})
						}
						if (data.category === "Games") {
							funEmbed.addFields({ name: `__**${data.name}:**__`, value: `**\`${(data.description !== "" ? data.description : "This command doesn't have a description")}\`**`})
						}
						if (data.category === "Misc") {
							miscEmbed.addFields({ name: `__**${data.name}:**__`, value: `**\`${(data.description !== "" ? data.description : "This command doesn't have a description")}\`**`})
						}
					} else if (data.permissions === "Owner" && message.member?.user.id === client.config.ownerId) {
						if (data.category === "Moderation") {
							moderationEmbed.addFields({ name: `__**${data.name}:**__`, value: `**\`${(data.description !== "" ? data.description : "This command doesn't have a description")}\`**`})
						}
						if (data.category === "Games") {
							funEmbed.addFields({ name: `__**${data.name}:**__`, value: `**\`${(data.description !== "" ? data.description : "This command doesn't have a description")}\`**`})
						}
						if (data.category === "Misc") {
							miscEmbed.addFields({ name: `__**${data.name}:**__`, value: `**\`${(data.description !== "" ? data.description : "This command doesn't have a description")}\`**`})
						}
					} else if (message.guild?.members.cache.get(message.member?.user.id as string)?.permissions.has(data.permissions as PermissionResolvable)) {
						if (data.category === "Moderation") {
							moderationEmbed.addFields({ name: `__**${data.name}:**__`, value: `**\`${(data.description !== "" ? data.description : "This command doesn't have a description")}\`**`})
						}
						if (data.category === "Games") {
							funEmbed.addFields({ name: `__**${data.name}:**__`, value: `**\`${(data.description !== "" ? data.description : "This command doesn't have a description")}\`**`})
						}
						if (data.category === "Misc") {
							miscEmbed.addFields({ name: `__**${data.name}:**__`, value: `**\`${(data.description !== "" ? data.description : "This command doesn't have a description")}\`**`})
						}
					}
				}
				
				const select: StringSelectMenuBuilder = new StringSelectMenuBuilder()
				.setCustomId('Commands type')
				.setPlaceholder('Select the type of the command')
				.addOptions(
					new StringSelectMenuOptionBuilder()
					.setLabel('Select a menu')
					.setValue('none')
					.setDefault(true),

					new StringSelectMenuOptionBuilder()
					.setLabel('Main')
					.setValue('main'),
					
					new StringSelectMenuOptionBuilder()
					.setLabel('Moderation')
					.setValue('moderation'),
					
					new StringSelectMenuOptionBuilder()
					.setLabel('Misc')
					.setValue('misc'),
					
					new StringSelectMenuOptionBuilder()
					.setLabel('Game')
					.setValue('game')
				);
				
				const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
				let response = await reply({ embeds: [ mainEmbed ], components: [ row ] });
				let collector = response?.createMessageComponentCollector({ componentType: ComponentType.StringSelect, filter: (i: StringSelectMenuInteraction<CacheType>) => i.user.id === message.member?.user.id && i.customId === "Commands type" }) as InteractionCollector<StringSelectMenuInteraction<CacheType>>;
				
				collector.on("collect", async (interaction: StringSelectMenuInteraction) => {
					try {
						const msg = await interaction.reply({ content: "<a:loading:1204754788055646218>・Please wait...", ephemeral: true });
						if (interaction.values[0] === "main") {
							reply({ embeds: [ mainEmbed ], components: [ row ] });
						}
						if (interaction.values[0] === "moderation") {
							reply({ embeds: [ moderationEmbed ], components: [ row ] });
						}
						if (interaction.values[0] === "game") {
							reply({ embeds: [ funEmbed ], components: [ row ] });
						}
						
						if (interaction.values[0] === "misc") {
							reply({ embeds: [ miscEmbed ], components: [ row ] });
						}
						msg.delete();
					} catch (err) { console.error(err); }
				});
				collector.once("end", () => {
					try {
						message.deleteReply();
					} catch (err) {
						console.error(err);
					}
				});
			}
		} catch(err) { console.error(err); }
	}
}

module.exports = commandExport;