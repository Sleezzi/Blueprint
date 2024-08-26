import { Guild } from "discord.js";
import { Database, PagesExpress } from "../interfacies";
const isValidTickets = (tickets: any, guild: Guild) => {
	const newTickets: any = {};
	for (const userId in tickets) {
		if (!tickets[userId].tickets) return false;
		if (!guild.members.cache.find(member => member.id === userId)) continue;
		newTickets[userId] = {};
		for (const [id, ticket] of Object.entries(tickets[userId as any].tickets as Database["server"]["tickets"]["user"])) {
			if (!ticket.content || typeof ticket.content !== "string" || ticket.content.length > 1000) return false;
			if (!ticket.madeAt || typeof ticket.madeAt !== "number" || ticket.madeAt > Date.now() / 1000) return false;
			if (ticket.updatedAt && (typeof ticket.updatedAt !== "number" || ticket.updatedAt > Date.now() / 1000)) return false;
			if (ticket.updatedAt) {
				newTickets[userId][id] = {
					content: ticket.content,
					madeAt: ticket.madeAt,
					updatedAt: ticket.updatedAt
				}
			} else {
				newTickets[userId][id] = {
					content: ticket.content,
					madeAt: ticket.madeAt
				}
			}
		}
	}
	return newTickets;
}

const moduleExport: PagesExpress = {
	name: "Set tickets",
	method: "PUT",
	url: "/setTickets",
	async execute(request, response, client) {
		try {
			const id = request.query.id as string;
			let body = request.body;
			
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

			const isValid = await isValidTickets(body, client.guilds.cache.get(id) as Guild)
			if (!isValid) {
				response.status(401).json({
					status: 401,
					message: "Invalid body"
				});
				return;
			}
			client.database.set(`${id}/tickets`, isValid);
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