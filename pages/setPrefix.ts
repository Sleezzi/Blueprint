import { PagesExpress } from "../interfacies";

const moduleExport: PagesExpress = {
	name: "Change prefix",
	method: "PUT",
	url: "/guild/setPrefix",
	async execute(request, response, client) {
		try {
			const id = request.query.id as string;
			const prefix = request.query.prefix as string;

			if (!id || !prefix) {
				response.status(400).json({
					status: 400,
					message: "Missing argument"
				});
				return;
			}
			if (prefix.length < 1) {
				response.status(403).json({
					status: 403,
					message: "Prefix to short"
				});
				return;
			}
			if (prefix.length > 3) {
				response.status(403).json({
					status: 403,
					message: "Prefix to long"
				});
				return;
			}
			if (/@|#|:|\`|\\|\||\*|\/| /.test(prefix)) {
				response.status(403).json({
					status: 403,
					message: "Bad prefix"
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
			if (prefix === client.config.prefix) {
				client.database.delete(`${id}/prefix`);
			} else {
				client.database.set(`${id}/prefix`, prefix.toLowerCase());
			}
			
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