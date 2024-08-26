import { PagesExpress } from "../interfacies";

const moduleExport: PagesExpress = {
	name: "commands",
	method: "GET",
	url: "/commands",
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
				response.status(404).json({
					status: 404,
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
					status: 404,
					message: "Invalid id"
				});
				return;
			}
			
			response.json({
				prefix: client.commands.prefix.toJSON(),
				app: client.commands.app.toJSON(),
				disabled: await client.database.get(`${id}/disabled`)[0] ? await client.database.get(`${id}/disabled`) : []
			});
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = moduleExport;