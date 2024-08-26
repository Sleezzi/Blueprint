import { Guild, GuildMember } from "discord.js";
import { Database, PagesExpress } from "../interfacies";

const buildTicket = (tickets: Database["server"]["tickets"], guild: Guild) => {
	const newTickets: any = {};
	for (const [id, t] of Object.entries(tickets)) {
		newTickets[id] = {
			username: guild.members.cache.find(member => member.id === id)?.user.username,
			avatar: guild.members.cache.find(member => member.id === id)?.user.avatarURL({ extension: "png" }) || guild.members.cache.find(member => member.id === id)?.user.defaultAvatarURL,
			tickets: t
		};
	}
	return newTickets;
};

const moduleExport: PagesExpress = {
	name: "Guild",
	method: "GET",
	url: "/guild",
	async execute(request, response, client) {
		try {
			const id = request.query.id as string;
			
			if (!id) {
				response.status(400).json({
					status: 400,
					message: "Missing argument"
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
					message: "Invalid id"
				});
				return;
			}
			
			response.json({
				name: client.guilds.cache.get(id)?.name,
				icon: client.guilds.cache.get(id)?.icon,
				banner: client.guilds.cache.get(id)?.banner,
				prefix: typeof (await client.database.get(`${id}/prefix`)) === "string" ? await client.database.get(`${id}/prefix`) : client.config.prefix,
				modules: await client.database.get(`${id}/modules`),
				tickets: buildTicket(await client.database.get(`${id}/tickets`), client.guilds.cache.get(id) as Guild),
				channels: client.guilds.cache.get(id)?.channels.cache.toJSON()
				.map((channel: any) => ({
					id: channel.id,
					name: channel.name,
					parent: channel.parentId,
					nsfw: channel.nsfw ? channel.nsfw : undefined,
					type: channel.type,
					permissions: channel.permissionsFor(channel.guild.members.cache.get(client.user?.id as string) as GuildMember).toJSON()
				})),
				roles: client.guilds.cache.get(id)?.roles.cache.toJSON().filter(role => !role.managed).map(role => ({
					id: role.id,
					name: role.name,
					color: role.hexColor,
					permissions: role.permissions,
					postion: role.rawPosition,
					icon: role.iconURL()
				}))
			});
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = moduleExport;