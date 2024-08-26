import { Client, Config, CommandPrefix, Event } from "./interfacies";
import { existsSync, readdirSync } from "fs";
import firebase from "firebase-admin";
import { Log, ParseAppOptionsTypes, ParseAppType, ParsePermissions, RedEyeLog } from "./components";

const enableConsoleWritingAndHandleCommands = (client: Client) => {
	process.stdin.setEncoding("utf8");
	
	process.stdin.on("data", async (key: string) => { // Retrieve typed content from console
		if (!key.trim().toLowerCase()) return;
		switch (key.trim().toLowerCase()) {
			case "exit":
				new Log("Exiting...");
				await client.kill(client.config.token, true); // Notify Discord that the bot is stopping
				break
			case "clear":
					console.log('\x1bc'); // Clear the console
					RedEyeLog();
				break;
			case "restart":
				await client.restart(client.config.token);
				new Log(`\n  %green%➜ Restarted%reset%\n`); // Log
				break;
			case "help":
				console.log(`\n\n  \x1b[32m➜\x1b[0m  Type help to show help\n  \x1b[32m➜\x1b[0m  Type clear to clear\n  \x1b[32m➜\x1b[0m  Type restart to restart\n  \x1b[32m➜\x1b[0m  Type exit or CTRL+C to exit\n\n`); // Log
				break;
			default:
				console.log(`${key.replace(/^\n/g, "")} is not a valid entry`);
		}
	});
}

const validConfig = () => {
	if (!existsSync("./config.json")) {
		console.log("It seems that you did not create a config.json file at the root of this folder\nYou can see the documentation to fill in the config.json correctly here: https://redeye.sleezzi.fr/#/docs/gettings-started/dev/config.json");
		return false;
	}
	// Check if the user has put their bot's token
	if (!require("./config.json").token) {
		console.log("It seems that the token is missing in the config.json\nYou can see the documentation to fill in the config.json correctly here: https://redeye.sleezzi.fr/#/docs/gettings-started/dev/config.json");
		return false;
	}
	// Check if the user has put their Discord ID
	if (!require("./config.json").ownerId) {
		console.log("It seems that the ownerId is missing in the config.json\nYou can see the documentation to fill in the config.json correctly here: https://redeye.sleezzi.fr/#/docs/gettings-started/dev/config.json");
		return false;
	}
	// Check if the user has put their main server id
	if (!require("./config.json").ownerServer) {
		console.log("It seems that the ownerServer is missing in the config.json\nYou can see the documentation to fill in the config.json correctly here: https://redeye.sleezzi.fr/#/docs/gettings-started/dev/config.json");
		return false;
	}
	// Check if the user has put a prefix for the commands
	if (!require("./config.json").prefix) {
		console.log("It seems that the prefix is missing in the config.json\nYou can see the documentation to fill in the config.json correctly here: https://redeye.sleezzi.fr/#/docs/gettings-started/dev/config.json");
		return false;
	}
	return true;
}

const loadCommandsPrefix = (client: Client) => {
	for (const file of readdirSync("./commands/prefix").filter((file) => file.endsWith(".ts"))) { // Creates a list of all files present in the "commands/prefix" folder then browses it
		const command: CommandPrefix = require(`./commands/prefix/${file}`); // Get the contents of the file
		if (command.name && command.category && (command.execute as any)) { // Check if the file is valid
			command.file = file.replace(".ts", "");
			client.commands.prefix.set(command.name, command); // Add the command to the list of prefix commands
			new Log(`Command "%aqua%${command.name}%reset%" loaded`); // Log
		} else new Log(`%red%[WARNING] Something missing with ${file}'s command %gray%(${!command.name ? "Command name is missing" : (!command.description ? "Command description is missing" : (!command.execute ? "The command execution function is missing" : (!command.model ? "Command model is missing" : (!command.category ? "Command category is missing" : "Unknow"))))})%reset%`); // Log the error
	}
}

const loadCommandsSlashAndContextMenu = (client: Client) => {
	// add all command in a array
	for (const file of readdirSync("./commands/slash").filter((file) => file.endsWith(".ts"))) { // Creates a list of all files present in the "commands/slash" folder then browses it
		const command = require(`./commands/slash/${file}`); // Get the contents of the file
		if (command.data && command.data.name && command.execute) { // Check if the file is valid
			if (command.data.options) command.data.options.forEach((option: any) => {
				if (typeof option.type !== "number") option.type = ParseAppOptionsTypes(option.type); // Modify the type of options to pass them in numbers so that Discord.js understands them
			});
			if (!command.data.type) command.data.type = 1; // Sets the default type of a command
			if (command.data.default_member_permissions && !/^\d+$/.test(command.data.default_member_permissions)) command.data.default_member_permissions = `${ParsePermissions(`${command.data.default_member_permissions}`.toLowerCase())}`; // Change the permissions to pass them in numbers so that Discord.js understands them
			client.commands.app.set(command.data.name, command); // Adds the command to the list of application commands
			new Log(`Command "%aqua%/${command.data.name}%reset%" created`); // Log
		} else new Log(`%red%[WARNING] Something missing with ${file}'s command %gray%(${!command.data ? "Command information is missing" : (!command.data.name ? "Command name is missing" : (!command.execute ? "The command execution function is missing" : ""))})%reset%`); // Log the error
	}

	for (const file of readdirSync("./contextMenu").filter((file) => file.endsWith(".ts"))) { // Creates a list of all files present in the "contextMenu" folder then browses it
		const command = require(`./contextMenu/${file}`); // Get the contents of the file
		if (command.data && command.data.name && command.data.type && command.execute) { // Check if the file is valid
			if (command.data.options) command.data.options.forEach((option: any) => {
				if (typeof option.type !== "number") option.type = ParseAppOptionsTypes(option.type); // Modify the type of options to pass them in numbers so that Discord.js understands them
			});
			if (typeof command.data.type !== "number") command.data.type = ParseAppType(command.data.type);
			if (command.data.default_member_permissions && !/^\d+$/.test(command.data.default_member_permissions)) command.data.default_member_permissions = `${ParsePermissions(command.data.default_member_permissions.toLowerCase())}`; // Change the permissions to pass them in numbers so that Discord.js understands them
			client.commands.app.set(command.data.name, command); // Adds the command to the list of application commands
			new Log(`Context command "%aqua%${command.data.name}%reset%" created`); // Log
		} else new Log(`%red%[WARNING] Something missing with ${file} context command`); // Log the error
	}
}

const loadEvents = (client: Client) => {
	for (const file of readdirSync("./events").filter((file) => file.endsWith(".ts"))) { // Creates a list of all files present in the "events" folder then browses it
		const event: Event = require(`./events/${file}`); // Get the contents of the file
		if (event.name && event.type && event.execute) { // Check if the file is valid
			new Log(`Event "%yellow%${event.name} (${event.event})%reset%" loaded`); // Log
			client[event.type](event.event, async (...args: Array<any>) => { // Create a listen for the event. When Discord.js detects the event, we retrieve the arguments and put them in an array called “args”
				try {
					const err: any = await event.execute(args, client); // We call the “execute” function present in the file
					if (err) { // Check if there are any errors
						if (typeof err === "object") {
							console.error("\x1b[31m", err, "\x1b[0m"); // Log the error
						} else {
							new Log(`%red%${err}`); // Log the error
						}
					}
				} catch(err) { console.error(err); }
			});
		} else {
			new Log(`%yellow%[WARNING] Something missing with ${file} event`);
		}
	}
}

const initDatabase = (config: Config["database"], client: Client) => {
	if (config) {
		firebase.initializeApp({
			credential: firebase.credential.cert(config?.credentials as any),
			databaseURL: config?.url // The database URL
		});
		client.database.database = firebase.database();
		new Log("The database has been initialized");
	} else {
		new Log("The bot may malfunction because there is no database");
	}
}

export function Init(client: Client) {
	enableConsoleWritingAndHandleCommands(client);
	if (!validConfig()) process.exit(0);
	client.config = require("./config.json");
	loadCommandsPrefix(client);
	loadCommandsSlashAndContextMenu(client);
	loadEvents(client);
	initDatabase(client.config.database, client);
	return client;
}