import { ChannelType, Guild, GuildMember, PermissionsBitField } from "discord.js";
import { Database, PagesExpress, Client, Module } from "../interfacies";

const isValidModules = async (modules: any, guild: Guild, client: Client) => {
	const newModules: any = {};
	if (modules.automod) {
		newModules.automod = {};
		if (modules.automod.defaultList && typeof modules.automod.defaultList !== "boolean") return "/modules/automod/defaultList";
		newModules.automod.defaultList = modules.automod.defaultList;
		if (modules.automod.ignore && typeof modules.automod.ignore !== "string") return "/modules/automod/ignore";
		if (!modules.automod.ignore || !guild.roles.cache.find(role => role.id === modules.automod.ignore)) {
			const role = await guild?.roles.create({
				name: "Ignore automod",
				mentionable: false,
				color: "DarkRed",
				permissions: []
			});
			modules.automod.ignore = `${role.id}`;
		}
		newModules.automod.ignore = modules.automod.ignore;
		if (modules.automod.words && typeof modules.automod.words !== "object") return "/modules/automod/words";
		if (modules.automod.words[0]) {
			for (const index in modules.automod.words) {
				modules.automod.words[index as any] = modules.automod.words[index as any]
				.replace(/\./g, "\\.")
				.replace(/\*/g, "\\*")
				.replace(/\*/g, "\\*")
				.replace(/\\/g, "\\\\")
				.replace(/\?/g, "\\?")
				.replace(/\(/g, "\\(")
				.replace(/\)/g, "\\)")
				.replace(/\[/g, "\\[")
				.replace(/\]/g, "\\]")
				.replace(/\|/g, "\\|")
				.replace(/\^/g, "\\^")
				.toLowerCase()
			}
			newModules.automod.words = modules.automod.words;
		}
	}
	if (modules.autorole) {
		if (typeof modules.autorole === "number") {
			modules.autorole = `${modules.autorole}`;
		} else if (typeof modules.autorole !== "string") return "/modules/autorole";
		if (!guild.roles.cache.find(role => role.id === modules.autorole)) return "/modules/autorole, Reason: \"Role doesn't exist\"";
		newModules.autorole = modules.autorole;
	}
	if (modules.join) {
		newModules.join = {};
		if (modules.join.background) {
			if (typeof modules.join.background !== "string" || modules.join.background.length > 75) return "/modules/join/background";
			newModules.join.background = modules.join.background;
		}
		if (!modules.join.channelId || typeof modules.join.channelId !== "string") return "/modules/join/channelId";
		if (!guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).find(channel => channel.id === modules.join.channelId)) return "/modules/join/channelId, Reason: \"Channel doesn't exist\"";
		if (!guild.channels.cache.get(modules.join.channelId)?.permissionsFor(guild.members.cache.get(client.user?.id as string) as GuildMember).has("SendMessages")) return "/modules/join/channelId, Reason: \"Bot can't send message in\"";
		newModules.join.channelId = modules.join.channelId;
		if (modules.join.message) {
			if (typeof modules.join.message !== "string" || modules.join.message.length > 50) return "/modules/join/message";
			newModules.join.message = modules.join.message;
		}
	}
	if (modules.leave) {
		newModules.leave = {};
		if (modules.leave.background) {
			if (typeof modules.leave.background !== "string" || modules.leave.background.length > 75) return "/modules/leave/background";
			newModules.leave.background = modules.leave.background;
		}
		if (!modules.leave.channelId || typeof modules.leave.channelId !== "string") return "/modules/leave/channelId";
		if (!guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).find(channel => channel.id === modules.leave.channelId)) return "/modules/leave/channelId, Reason: \"Channel doesn't exist\"";
		if (!guild.channels.cache.get(modules.leave.channelId)?.permissionsFor(guild.members.cache.get(client.user?.id as string) as GuildMember).has("SendMessages")) return "/modules/leave/channelId, Reason: \"Bot can't send message in\"";
		newModules.leave.channelId = modules.leave.channelId;
		if (modules.leave.message) {
			if (typeof modules.leave.message !== "string" || modules.leave.message.length > 50) return "/modules/leave/message";
			newModules.leave.message = modules.leave.message;
		}
	}
	if (modules.levels) {
		if (modules.levels.active !== false) {
			if (!modules.levels.active || modules.levels.active !== true) return "/modules/levels/active";
			newModules.levels = {
				active: true
			}
			if (modules.levels.ignore && typeof modules.levels.ignore !== "string") return "/modules/levels/ignore";
			if (!modules.levels.ignore || !guild.roles.cache.find(role => role.id === modules.levels.ignore)) {
				const role = await guild?.roles.create({
					name: "no exp",
					mentionable: false,
					color: "DarkRed",
					permissions: []
				});
				modules.levels.ignore = `${role.id}`;
			}
			newModules.levels.ignore = modules.levels.ignore;
		}
	}
	if (modules.link) {
		if (modules.link.active !== false) {
			if (modules.link.active !== true) return "/modules/link/active";
			newModules.link = {
				active: true
			}
			if (modules.link.ignore && typeof modules.link.ignore !== "string") return "/modules/link/ignore";
			if (!modules.link.ignore || !guild.roles.cache.find(role => role.id === modules.link.ignore)) {
				const role = await guild?.roles.create({
					name: "Allow link",
					mentionable: false,
					color: "DarkRed",
					permissions: []
				});
				modules.link.ignore = `${role.id}`;
			}
			newModules.link.ignore = modules.link.ignore;
		}
	}
	if (modules.log) {
		if (!modules.log || typeof modules.log !== "string" || modules.log.length !== 19) return "/modules/log";
		if (!guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).find(channel => channel.id === modules.log)) return "/modules/log, Reason: \"Channel doesn't exist\"";
		if (!guild.channels.cache.get(modules.log)?.permissionsFor(guild.members.cache.get(client.user?.id as string) as GuildMember).has("SendMessages")) return "/modules/log, Reason: \"Bot can't send message in\"";
		newModules.log = modules.log;
	}
	return newModules;
}

const moduleExport: PagesExpress = {
	name: "Modules",
	method: "PUT",
	url: "/modules",
	async execute(request, response, client) {
		try {
			const id = request.query.id as string;
			let body: Database["server"]["modules"] | null = request.body;
			
			if (!id || !body) {
				response.status(400).json({
					status: 400,
					message: "Missing argument"
				});
				return;
			}
			if (typeof body !== "object") {
				response.status(400).json({
					status: 400,
					message: "Invalid body"
				});
				return;
			}
			
			if (!client.guilds.cache.find(guild => guild.id === id)) {
				response.status(400).json({
					status: 400,
					message: "Invalid id"
				});
				return;
			}
			const isValidBody = await isValidModules(body, client.guilds.cache.get(id) as Guild, client);
			if (typeof isValidBody === "string") {
				response.status(400).json({
					status: 400,
					message: `Invalid body ${isValidBody}`
				});
				return;
			}
			body = isValidBody;
			
			if (!request.headers.authorization ||
				!request.headers.authorization.startsWith("Bearer ")
			) {
				response.status(401).json({
					status: 401,
					message: "Invalid auth"
				});
				return;
			}
			const userData: any = await fetch("https://discord.com/api/users/@me", {
				headers: {
					Authorization: request.headers.authorization
				}
			}).then(response => response.json());
			if (userData.code === 0) {
				response.status(401).json({
					status: 401,
					message: "Invalid auth"
				});
				return;
			}
			if (
				!client.guilds.cache.get(id)?.members.cache.find(member => member.id === userData.id) ||
				!client.guilds.cache.get(id)?.members.cache.get(userData.id)?.permissions.has("ManageGuild")
			) {
				response.status(401).json({
					status: 401,
					message: "Invalid id or auth"
				});
				return;
			}
			client.database.set(`${id}/modules`, body);
			response.json({
				code: 200,
				message: "Success"
			});
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = moduleExport;