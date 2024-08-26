import {
	ActionRowBuilder,
	ButtonBuilder,
	CacheType,
	ChatInputCommandInteraction,
	Client as DiscordClient,
	Collection,
	ComponentEmojiResolvable,
	Message,
	ModalSubmitInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
	PermissionResolvable,
	ClientEvents,
	ActivityType,
	InteractionResponse,
	StringSelectMenuInteraction,
	Locale,
	Embed,
	InteractionReplyOptions,
	MessageComponent,
	EmbedBuilder,
	MessageMentionOptions,
	MessagePayload,
	InteractionEditReplyOptions
} from "discord.js";
import { Log, ParseAppOptionsTypes, ParseAppType, ParsePermissions } from "./components";

import { database as FIREDB } from "firebase-admin";

import { readdirSync, existsSync } from "fs"; // Import FS module
import { Request, Response } from "express"; 

export interface PagesExpress {
	name: string;
	method: "GET" | "POST" | "PUT" | "DELETE"
	url: string;
	execute: (request: Request, response: Response, client: Client) => any
}
export interface PagesWS {
	event: string;
	execute: (rmessage: MessageWS) => any
}
export interface MessageWS {
	event: string,
	args: Array<any>
}
export interface Module {
	name?: string;
	description?: string;
	value: string;
	emoji?: ComponentEmojiResolvable;
	help?: string;
	noReply?: boolean;
	execute: {
		(message: Message,
			[
				responseToReaction,
				Buttons
			]:
			[
				StringSelectMenuInteraction<CacheType> | StringSelectMenuInteraction<"cached">,
				InteractionResponse<boolean>,
				ActionRowBuilder<ButtonBuilder>
			] | [
				StringSelectMenuInteraction<CacheType> | StringSelectMenuInteraction<"cached">
			],
		client: Client): any
	};
}

export interface Locales {
	[index: string]: string
}

export interface Event {
	name: string
	event: keyof ClientEvents,
	type: "on" | "once",
	execute: (args: any, client: Client) => any
}

export interface CommandPrefix {
	name: string,
	description?: string,
	model?: string,
	permissions?: PermissionResolvable | "Owner",
	category: "Misc" | "Moderation" | "Games",
	file?: string,
	execute: (message: Message, client: Client) => any
}

export interface CommandSlash {
	data: any,
	loadingMessage?: boolean,
	servers?: "All" | "Owner" | Array<string>
	execute: (interaction: ChatInputCommandInteraction<CacheType>, client: Client, reply: (response: string | MessagePayload | InteractionReplyOptions | InteractionEditReplyOptions) => Promise<Message<boolean>> | undefined) => any
}

export interface Modal {
	name: string,
	customId: string,
	execute: (interaction: ModalSubmitInteraction<CacheType>, client: Client) => any
}

export interface ContextMenu {
	data: any,
	loadingMessage?: boolean,
	servers?: "All" | "Owner" | Array<string>
	execute: (interaction: UserContextMenuCommandInteraction<CacheType> | MessageContextMenuCommandInteraction<CacheType>, client: Client, reply: any) => any
}

export interface Database {
	/**
	 * Members banned by developers will no longer be able to join servers on which advanced moderation has been activated.
	 */
	bannedMember: {
		/**
		 * The user id of the member
		 */
		userId: {
			/**
			 * The ID of the server on which the member was banned
			 */
			serverId: string,
			/**
			 * The reason for banning the member
			 */
			reason?: string,
			/**
			 * The duration of the ban
			 */
			duration: string
		}
	};
	/**
	 * The server's id
	 */
	server: {
		/**
		 * Contains server member levels
		 */
		levels: {
			/**
			 * The user id of the member
			 */
			user: {
				/**
				 * Member level
				 */
				level: number;
				/**
				 * The number of experience of the member, a member gains 1 experience with each message, reaching 150 times the level, the level increases.
				 * Example, a level 2 member will need 300 experience to move to level 3.
				 */
				xp: number;
			}
		};
		/**
		 * Contains server member tickets
		 */
		tickets: {
			/**
			 * The user id of the member
			 */
			user: {
				/**
				 * Ticket ID
				 */
				id: {
					/**
					 * The content of the ticket
					 */
					content: string;
					/**
					 * The creation date of the ticket, it must be put in a string to avoid the approximation of Realtime Database
					 */
					madeAt: string;
					/**
					 * The last modification date of the ticket must be put in a string to avoid Realtime Database approximation.
					 * It may be empty if the ticket has never been modified
					 */
					updatedAt?: string;
				}
			}
		};
		/**
		 * Contains the modules active on the server
		 */
		modules: {
			/**
			 * The “join” module corresponds to the welcome message sent to a server channel
			 */
			join: {
				/**
				 * This corresponds to the channel ID, it is mandatory, if there is none, the module is inactive
				 */
				channelId: string;
				/**
				 * The custom message sent in the image, "$user" will be replaced with the member's username
				 */
				message?: string;
				/**
				 * The background of the image which will be sent to the channel
				 */
				background?: string;
			};
			/**
			 * The role id that will be given to the new server member
			 */
			autorole?: string;
			/**
			 * The “leave” module corresponds to the message sent to a room when a member leaves the server
			 */
			leave: {
				/**
				 * This corresponds to the channel ID, it is mandatory, if there is none, the module is inactive
				 */
				channelId: string;
				/**
				 * The custom message sent in the image, "$user" will be replaced with the member's username
				 */
				message?: string;
				/**
				 * The background of the image which will be sent to the channel
				 */
				background?: string;
			};
			/**
			 * This module allows you to send messages in a room defined by the moderators, it allows you to create a history of actions carried out on the server.
			 */
			log: string;
			/**
			 * The message moderation module
			 */
			automod: {
				/**
				 * The level of moderation. In classic mode only messages are moderated. In advance mode, messages and user names are moderated and if a member is banned on a server where the bot has activated this module in advanced mode, the member will be automatically expelled from the server that has arrived.
				 */
				defaultList?: true;
				/**
				 * The list of words that must be banned, the bot converts the words into Regexp if they are not already. These words are added manually by the server moderators
				 */
				words?: Array<string>;
				/**
				 * The role id "Ignore Automod" If a member there, it will not be affected by automod
				 */
				ignore: string;
			},
			/**
			 * This module allows you to automatically delete messages containing links
			 */
			link?: {
				/**
				 * Module status
				 */
				active: boolean;
				/**
				 * The role id "allow link" If a member is there, his messages will not be deleted if he puts links there
				 */
				ignore: string;
			};
			/**
			 * The leveling module
			 */
			levels: {
				/**
				 * The status of the module
				 */
				active: boolean;
				/**
				 * Contains the role id "noExp" When a member has this role, the bot does not give exp to the member
				 */
				ignore: string
			}
		};
		/**
		 * Contains the list of command names disabled by server moderators
		 */
		disabled?: Array<string>;
		/**
		 * The server prefix, if there is nothing it means the prefix has not been changed
		 */
		prefix?: string;
	};
}

export interface ProfileEdit {
	image: string,
	type: "avatar" | "banner",
	username: string,
	condition?: boolean | (() => boolean)
}

export interface Presence {
	name: string | ((client: Client) => string),
	type: ActivityType,
	url?: string,
	state?: string,
	condition?: boolean | ((client: Client) => boolean)
}

export interface Config {
	ownerId: string;
	ownerServer: string;
	token: string;
	prefix: string;
	port?: string;
	defaultLanguage?: string;
	database?: {
		credentials: {
			type: "service_account";
			project_id: string;
			private_key_id: string;
			private_key: string;
			client_email: string;
			client_id: string;
			auth_uri: "https://accounts.google.com/o/oauth2/auth";
			token_uri: "https://oauth2.googleapis.com/token";
			auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs";
			client_x509_cert_url: string;
			universe_domain: string;
		}
		url: string
	};
};

export class Client extends DiscordClient {
	commands: {
		prefix: Collection<string, CommandPrefix>;
		app: Collection<string, CommandSlash | ContextMenu>;
	} = {
		prefix: new Collection(),
		app: new Collection()
	};
	config: Config = {
		token: "",
		prefix: "!",
		ownerId: "542703093981380628",
		ownerServer: "1200750236277157999",
		database: {
			credentials: {
				type: "service_account",
				project_id: "",
				private_key_id: "",
				private_key: "",
				client_email: "",
				client_id: "",
				auth_uri: "https://accounts.google.com/o/oauth2/auth",
				token_uri: "https://oauth2.googleapis.com/token",
				auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
				client_x509_cert_url: "",
				universe_domain: "googleapis.com"
			},
			url: ""
		}
	};
	translate = (lang: Locale | string, path: string) => {
		if (existsSync(`./locales/${path.startsWith("/") ? "" : "/"}${path.endsWith(".json") ? path : `${path}.json`}`)) {
			const translate = require(`./locales/${path.startsWith("/") ? "" : "/"}${path.endsWith(".json") ? path : `${path}.json`}`);
			if (translate[lang]) return translate[lang];
			return translate.default;
		} else {
			console.log(`${path} does not exist!`);
			return {};
		}
	}
	database: {
		database?: FIREDB.Database,
		get: (path: string) => any,
		set: (path: string, data: any) => void,
		delete: (path: string) => void
	} = {
		get: async (path: string) => {
			try {
				if (!this.database.database) return;
				let currentObj = (await this.database.database?.ref("/").once("value")).val();
				for (const name of path.split("/").filter((part: string) => part !== "")) {
					if (!currentObj[name]) {
						currentObj[name] = {}; // If the element does not exist, we give it a default value
					}
					currentObj = currentObj[name]
				};
				return currentObj; // Return the data
			} catch (err) { console.error(err); }
		},
		set: async (path: string, newData: any) => {
			try {
				if (!this.database.database) return;
				await this.database.database?.ref((path.startsWith("/") ? path : `/${path}`)).set(newData);
			} catch (err) { console.error(err); }
		},
		delete: async (path: string) => {
			try {
				if (!this.database.database) return;
				this.database.database?.ref((path.startsWith("/") ? path : `/${path}`)).remove(); // Delete the item on the remote database (firebase)
			} catch (err) { console.error(err); }
		}
	}
	/**
	 * Restart the bot
	 */
	restart = async (token: string) => {
		await this.kill(token, false); // Notify Discord that the bot is stopping
		new Log(`  %gray%➜  Restarting%reset%\n`); // Log
		for (const file of readdirSync("./commands/prefix").filter((file) => file.endsWith(".ts"))) { // Creates a list of all files present in the "commands/prefix" folder then browses it
			const command: CommandPrefix = require(`./commands/prefix/${file}`); // Get the contents of the file
			if (command.name && command.category && (command.execute as any)) { // Check if the file is valid
				command.file = file.replace(".ts", "");
				this.commands.prefix.set(command.name, command); // Add the command to the list of prefix commands
				new Log(`Command "%aqua%${command.name}%reset%" loaded`); // Log
			} else new Log(`%red%[WARNING] Something missing with ${file}'s command %gray%(${!command.name ? "Command name is missing" : (!command.description ? "Command description is missing" : (!command.execute ? "The command execution function is missing" : (!command.model ? "Command model is missing" : (!command.category ? "Command category is missing" : "Unknow"))))})%reset%`); // Log the error
		}
		
		// add all command in a array
		for (const file of readdirSync("./commands/slash").filter((file) => file.endsWith(".ts"))) { // Creates a list of all files present in the "commands/slash" folder then browses it
			const command = require(`./commands/slash/${file}`); // Get the contents of the file
			if (command.data && command.data.name && command.execute) { // Check if the file is valid
				if (command.data.options) command.data.options.forEach((option: any) => {
					if (typeof option.type !== "number") option.type = ParseAppOptionsTypes(option.type); // Modify the type of options to pass them in numbers so that Discord.js understands them
				});
				if (!command.data.type) command.data.type = 1; // Sets the default type of a command
				if (command.data.default_member_permissions && !/^\d+$/.test(command.data.default_member_permissions)) command.data.default_member_permissions = `${ParsePermissions(`${command.data.default_member_permissions}`.toLowerCase())}`; // Change the permissions to pass them in numbers so that Discord.js understands them
				this.commands.app.set(command.data.name, command); // Adds the command to the list of application commands
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
				this.commands.app.set(command.data.name, command); // Adds the command to the list of application commands
				new Log(`Context command "%aqua%${command.data.name}%reset%" created`); // Log
			} else new Log(`%yellow%[WARNING] Something missing with ${file} context command`); // Log the error
		}
		
		await this.login(token); // Register the bot on Discord
	};
	/**
	 * Stop the bot
	 */
	kill = async (
		/**
		 * The bot token
		 */
		token: string,
		/**
		 * Does the bot stop permanently?
		 */
		exit?: boolean
	) => {
		await this.destroy();
		if (exit === true) {
			process.exit(0);
		}
	}
}