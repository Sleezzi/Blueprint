import { readdirSync } from "fs";
import express, { Express, Request, Response } from "express";
import { json as BodyParserJSON, urlencoded } from "body-parser";
import { Log } from "../components";
import { Event, MessageWS, PagesExpress, PagesWS } from "../interfacies";

const event: Event = {
	name: "AppCommandsHandler",
	event: "ready", // When someone places an commands
	type: "on",
	async execute([]: [], client) {
		try {
			if (!client.config.port) return;
			const app = express();
			app.use((req, res, next) => {
				res.header('Access-Control-Allow-Origin', '*');
				next();
			});
			app.use(BodyParserJSON());
			app.use(urlencoded({ extended: true }));
			app.use((require("cors"))());
			app.enable("trust proxy");
			app.set("etag", false);
			
			for (const file of readdirSync("./pages").filter((file) => file.endsWith(".ts"))) { // Creates a list of all files present in the "events" folder then browses it
				const page: PagesExpress = require(`../pages//${file}`); // Get the contents of the file
				if (page.name && page.url && page.method && page.execute) { // Check if the file is valid
					new Log(`Page "%green%${page.name}%reset%" %gray%(http://localhost:${client.config.port}${page.url.startsWith("/") ? "" : "/"}${page.url})%reset% loaded`); // Log
					app[page.method.toLowerCase() as keyof Express](`${page.url.startsWith("/") ? "" : "/"}${page.url}`, (request: Request, response: Response) => {
						page.execute(request, response, client);
						new Log(`Page "%green%${page.name}%reset%" %gray%(http://localhost:${client.config.port}${page.url.startsWith("/") ? "" : "/"}${page.url})%reset% used (ip: ${request.ip})`)
					});
				} else {
					new Log(`%red%[WARNING] Something missing with ${file} page`);
				}
			}

			app.listen(client.config.port, () => {
				new Log(`Bot API is running at %gray%http://localhost:${client.config.port}%reset%`);
			});
		} catch(err) { console.error(err); } // Catch errors and send them to the console
	}
}

module.exports = event;