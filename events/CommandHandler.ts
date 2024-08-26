import { EmbedBuilder, Message, TextChannel } from "discord.js";
import { Database as DatabaseInterface, Event } from "../interfacies";
import { Log } from "../components";

const event: Event = {
	name: "CommandsHandler",
	event: "messageCreate",
	type: "on",
	async execute([message]: [Message], client) {
		if (
			message.channel.type === 1 || // If the message comes from the bot's DMs
			message.author.bot // If the message comes from the bot
		) return; // End here
		
		const serverData: DatabaseInterface["server"] = await client.database.get(`/${message.guild?.id}`); // Get serverData from db
		if (!serverData.prefix) serverData.prefix = client.config.prefix; // Check if the server have a custom prefix, if he don't have, it's put "!" by default
		if (!serverData.disabled) serverData.disabled = []; // Check if the server have a disabled command, if he don't have, it set disabled on a Array to don't make error
		
		if (message.content === "!help") {
			require("../commands/prefix/help").execute(message, client);
			return;
		}
		const texts = client.translate(message.guild?.preferredLocale as string, "events/CommandHandler");
		const globalsTexts = client.translate(message.guild?.preferredLocale as string, "globals/globals");
		
		if (message.content.startsWith(serverData.prefix)) { // Check if message is a command
			const command = message.content.toLowerCase().replace(serverData.prefix, "").split(" ")[0]; // Get the command
			if (client.commands.prefix.has(command)) { // Check if it's a valid command
				try {
					new Log(`%aqua%${(message.member?.nickname ? `${message.member.nickname} (${(message.author.tag.endsWith("#0") ? `${`${message.author.username}`.replace(`${message.author.username}`.slice(1), "").toUpperCase()}${`${message.author.username}`.slice(1)}` : `${`${message.author.tag}`.replace(`${message.author.tag}`.slice(1), "").toUpperCase()}${`${message.author.tag}`.slice(1)}`)})` : `${(message.author.tag.endsWith("#0") ? `${`${message.author.username}`.replace(`${message.author.username}`.slice(1), "").toUpperCase()}${`${message.author.username}`.slice(1)}` : `${`${message.author.tag}`.replace(`${message.author.tag}`.slice(1), "").toUpperCase()}${`${message.author.tag}`.slice(1)}`)}`)}%reset% used the %yellow%${serverData.prefix}${command}%reset% command ${(message.content.toLowerCase().split(`${command} `).slice(1).length > 0 ? `(%gray%${message.content.toLowerCase().split(`${command} `).slice(1)}%reset%) ` : '')}on server %aqua%${message.guild?.name}%reset% (%gray%${message.guild?.id}%reset%)`); // Log message in console
					if (serverData.disabled.find((c: any) => c === command)) { // Check if the server has disabled the command
						const msg = await message.reply({ embeds: [{
							color: 0xff0000,
							title: `${globalsTexts.error}`,
							fields: [
								{ name: `<a:no:1211019198881472622>・${texts.disabled}.`, value: '\u200B', inline: false },
								{ name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
							],
							footer: {
								text: `Id: ${message.id}`,
								icon_url: client.user?.avatarURL() as string,
							}
						}]});
						setTimeout(() => {
							try {
								msg.delete();
								if (message) message.delete();
							} catch(err) { console.error(err); }
						}, 5_000); // send message to warn the user about the disabled command
						return; // End here
					}
					const err = await require(`../commands/prefix/${command}`).execute(message, client); // Execute the command
					if (err) console.error(err); // Check if some error happned
					if (serverData.modules &&
						serverData.modules.log &&
						message.channelId !== serverData.modules.log &&
						message.guild?.channels.cache.find((channel) => channel.id === serverData.modules?.log)
					) { // Check if a log channel is defined and if the message has don't been send in a whitelisted channel
						const embed = new EmbedBuilder()
							.setColor("Green")
							.setTitle(texts.newCommand)
							.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() as string, url: message.url })
							.addFields(
								{ name: `:keyboard:・__${globalsTexts.command}:__`, value: `**\`${command}\`**` },
								{ name: `:gear:・__${globalsTexts.options}:__`, value: `**\`${message.content.split(`${serverData.prefix}${command} `).slice(1)}\`**` },
								{ name: `<:tag:1200813621970739251>・__${globalsTexts.channel}:__`, value: `<#${message.channelId}> \`(${message.channelId})\``},
								{ name: `<:nametag:1200757678104915978>・__${globalsTexts.author}:__`, value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
								{ name: `<:time:1205987554260684870>・__${globalsTexts.date}:__`, value: `<t:${Math.floor(message.createdAt as any / 1000)}:d> (<t:${Math.floor(message.createdAt as any / 1000)}:R>)` },
							)
							.setURL(message.url)
							.setFooter({ text: `Id: ${message.id}`, iconURL: client.user?.avatarURL() as string });
						(message.guild?.channels.cache.get(serverData.modules.log) as TextChannel).send({ embeds: [embed]}); // Send the log in the channel selected by the admin of the server
					}
				} catch(err) { console.error(err); }
			} else { // If command don't existe
				if (
					!serverData.modules ||
					!serverData.modules.log ||
					message.channelId === serverData.modules.log ||
					!message.guild?.channels.cache.find((channel) => channel.id === serverData.modules?.log)
				) return; // Check if a log channel is defined and if the message has don't been send in a whitelisted channel
				const embed = new EmbedBuilder()
					.setColor("Red")
					.setTitle(texts.newCommand)
					.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() as string, url: message.url })
					.addFields(
						{ name: `:keyboard:・__${globalsTexts.command}:__`, value: `**\`${command}\`**` },
						{ name: `:gear:・__${globalsTexts.options}:__`, value: `**\`${message.content.replace(`${serverData.prefix}${command}`, "").split(" ")[0]}\`**` },
						{ name: `<:tag:1200813621970739251>・__${globalsTexts.channel}:__`, value: `<#${message.channelId}> \`(${message.channelId})\``},
						{ name: `<:nametag:1200757678104915978>・__${globalsTexts.author}:__`, value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
						{ name: `<:time:1205987554260684870> -__${globalsTexts.date}:__`, value: `<t:${Math.floor(message.createdAt as any / 1000)}:d> (<t:${Math.floor(message.createdAt as any / 1000)}:R>)` },
					)
					.setURL(message.url)
					.setFooter({ text: `Id: ${message.id}`, iconURL: client.user?.avatarURL() as string });
				(message.guild?.channels.cache.get(serverData.modules.log) as TextChannel).send({ embeds: [embed]}); // Send the message of the log in the log channel
			}
		}
	}
}
module.exports = event;