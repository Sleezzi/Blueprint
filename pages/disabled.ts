import { PagesExpress } from "../interfacies";

const moduleExport: PagesExpress = {
	name: "Disable commands",
	method: "POST",
	url: "/commands/disabled",
	async execute(request, response, client) {
		try {
			const id = request.query.id as string;
			const body: Array<string> | null = request.body;

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
			if (!body[0]) {
				client.database.delete(`${id}/disabled`);
			} else {
				let isValid = true;
				body.forEach((command: any) => {
					if (typeof command !== "string") return isValid = false;
					if (!client.commands.prefix.find(cmd => cmd.name === command) &&
					!client.commands.app.find(cmd => cmd.data.name === command)) isValid = false;
				});
				if (!isValid) {
					response.status(400).json({
						status: 400,
						message: "Invalid body : Invalid command(s)"
					});
					return;
				}
				client.database.set(`${id}/disabled`, body);
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