import { readdirSync  } from "fs";
import { Client, Event, ProfileEdit } from "../interfacies";
import { resolveImage, REST, Routes } from "discord.js";

const event: Event = {
	name: "UpdateProfilePictureHandler",
	event: "ready", // Puts a custom status on the bot
	type: "on",
	execute([]: any, client: Client) {
		function delay(ms: number) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		const fun = async () => {
			try {
				for (const file of readdirSync("./profile/profilePicture&banner").filter((file) => file.endsWith(".ts"))) {
					const profile: ProfileEdit = require(`../profile/profilePicture&banner/${file}`);
					
					if (profile.condition !== undefined && profile.condition && client.user?.username !== profile.username) {
						if (profile.type === "avatar") {
							client.user?.edit({ avatar: profile.image, username: profile.username });
						}
						if (profile.type === "banner") {
							const rest = new REST().setToken(client.config.token);
							await rest.patch(Routes.user(), {
								body: {
									banner: await resolveImage(profile.image),
								},
							});
							client.user?.edit({ username: profile.username });
						}
					}
					await delay(120_000);
				}
			} catch(err) { return console.error(err); }
		}
		setInterval(fun, readdirSync("./profile/profilePicture&banner").filter((file: string) => file.endsWith(".ts")).length * 120_000 + 1);
		fun();
	}
}
module.exports = event;