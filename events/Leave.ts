import { registerFont, createCanvas, loadImage } from "canvas";
import { Database as DatabaseInterface, Event } from "../interfacies";
import { AttachmentBuilder, GuildMember, TextChannel } from "discord.js";

registerFont("./cdn/fonts/ProtestStrike.ttf", { family: "Protest Strike" }); // Load font

const properties = {
	image: {
		width: 712,
		height: 400,
		background: "https://redeye.sleezzi.fr/cdn/img/canvas-background-goodbye.png"
	},
	overlay: {
		get x() {
			return properties.overlay.margin;
		},
		get y() {
			return properties.overlay.margin;
		},
		get width() {
			return properties.image.width - properties.overlay.margin * 2;
		},
		get height() {
			return properties.image.height - properties.overlay.margin * 2;
		},
		color: "#00000050",
		margin: 15
	},
	pdp: {
		background: {
			get x() {
				return properties.image.width / 2
			},
			get y() {
				return properties.image.height / 3
			},
			size: 100
		},
		image: {
			get x() {
				return properties.pdp.background.x - properties.pdp.image.size
			},
			get y() {
				return properties.pdp.background.y - properties.pdp.image.size
			},
			get size() {
				return properties.pdp.background.size - 4
			}
		}
		
	},
	username: {
		get x() {
			return properties.image.width / 2
		},
		get y() {
			return properties.image.height / 3 + properties.pdp.background.size + properties.username.size
		},
		size: 64,
		get lineWidth() {
			return Math.floor(properties.username.size / 20)
		},
	},
	goodbye: {
		get x() {
			return properties.image.width / 2
		},
		get y() {
			return properties.username.y + properties.goodbye.size
		},
		size: 35,
		get lineWidth() {
			return Math.floor(properties.goodbye.size / 20)
		},
	},
	pdpBot: {
		get x() {
			return properties.image.width - properties.pdpBot.size / 2 - 7
		},
		get y() {
			return properties.image.height - properties.pdpBot.size / 2 - 7
		},
		size: 50
	}
}

const event: Event = {
	name: "MemberLeave",
	event: "guildMemberRemove", // When a member leave a server
	type: "on",
	async execute([member]: [GuildMember], client) {
		try {
			const goodbye: DatabaseInterface["server"]["modules"]["leave"] = await client.database.get(`/${member.guild.id}/modules/leave`); // Get the goodbye channel id
			if (
				!goodbye.channelId || // If there is none
				!member.guild.channels.cache.find(c => c.id === goodbye.channelId) || // If the channel does not exist/no longer exists
				!member.guild.channels.cache.find(c => c.id === goodbye.channelId)?.permissionsFor(member.guild.members.cache.find(member => member.id === client.user?.id) as GuildMember)?.has("SendMessages") || // If the bot can't send messages in this channel
				member.user.bot // If the new member is a bot
			) return; // End here
			(member.guild.channels.cache.find(c => c.id === goodbye.channelId) as TextChannel).sendTyping();
			
			const globalsTexts = client.translate(member.guild?.preferredLocale as string, "globals/globals");
			
			const image = createCanvas(properties.image.width, properties.image.height); // Create an image
			const ctx = image.getContext("2d"); // Initialize canvas
			const background = await loadImage(properties.image.background);
			ctx.drawImage(background, 0, 0, properties.image.width, properties.image.height); // Draw the background image
			
			// Drawn overlay
			ctx.fillStyle = properties.overlay.color || "#FFF"; // Make the text white
			ctx.fillRect(properties.overlay.x || 0, properties.overlay.y || 0, properties.overlay.width || 0, properties.overlay.height || 0); // Fill the circle blank
			
			// Username
			ctx.font = `${properties.username.size || 42}px "Protest Strike"`; // Change the text font
			ctx.fillStyle = "#FFF"; // Make the text white
			ctx.textAlign = "center"; // Position the text in the center
			ctx.lineWidth = properties.username.lineWidth || 4;  //define the width of the stroke line
			ctx.fillText(member.user.username.toUpperCase().toUpperCase(), properties.username.x || 0, properties.username.y || 0); // Write the member's name
			ctx.strokeText(member.user.username.toUpperCase().toUpperCase(), properties.username.x || 0, properties.username.y || 0);
			
			// Goodbye Text
			ctx.fillStyle = "#FFF"; // Make the text white
			ctx.font = `35px "Protest Strike"`; // Change the text font
			ctx.textAlign = "center"; // Position the text in the center
			ctx.lineWidth = properties.goodbye.lineWidth || 4;  //define the width of the stroke line
			ctx.fillText(goodbye.message?.replace(/\$user/g, member.user.username.toUpperCase()) || `${globalsTexts.goodbye}!`, properties.goodbye.x || 0, properties.goodbye.y || 0); // Writes the member level
			ctx.strokeText(goodbye.message?.replace(/\$user/g, member.user.username.toUpperCase()) || `${globalsTexts.goodbye}!`, properties.goodbye.x || 0, properties.goodbye.y || 0);
			
			ctx.beginPath();
			ctx.save(); // Save the image
			ctx.arc(properties.pdpBot.x || 0, properties.pdpBot.y || 0, properties.pdpBot.size / 2 + properties.overlay.margin / 1.25, 0, Math.PI * 2);
			ctx.clip();
			ctx.drawImage(background, 0, 0, properties.image.width, properties.image.height); // Draw the background image
			ctx.closePath();

			// Drawn bot logo
			ctx.beginPath(); // Create a new path
			const pdpbot = await loadImage(client.user?.avatarURL({ extension: "png" }) as string); // Load the bot's profile image
			ctx.arc(properties.pdpBot.x || 0, properties.pdpBot.y || 0, properties.pdpBot.size / 2, 0, Math.PI * 2); // Draw a circle
			ctx.save(); // Save the image
			ctx.clip(); // Cut the sheet so that you can only write in this circle
			ctx.drawImage(pdpbot, properties.pdpBot.x - properties.pdpBot.size / 2, properties.pdpBot.y - properties.pdpBot.size / 2 || 0, properties.pdpBot.size || 0, properties.pdpBot.size || 0); // Draw the bot's profile picture
			ctx.restore(); // Restore the sheet
			ctx.closePath(); // Close last path
			
			// Drawn the user profile picture
			ctx.beginPath(); // Create a new path
			ctx.arc(properties.pdp.background.x || 0, properties.pdp.background.y || 0, properties.pdp.background.size || 0, 0, Math.PI * 2); // Draw a circle
			ctx.save(); // Save the image
			ctx.clip(); // Cut the sheet so that you can only write in this circle
			ctx.fillRect(properties.pdp.background.x - properties.pdp.background.size || 0, properties.pdp.background.y - properties.pdp.background.size || 0, properties.pdp.background.size * 2 || 0, properties.pdp.background.size * 2 || 0); // Fill the circle blank
			ctx.restore(); // Restore the sheet
			ctx.closePath(); // Close last path
			
			ctx.beginPath(); // Create a new path
			const pdp = await loadImage(member.user.avatar ? `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=1024` : member.user.defaultAvatarURL); // Load member image
			ctx.arc(properties.pdp.background.x || 0, properties.pdp.background.y || 0, properties.pdp.image.size || 0, 0, Math.PI * 2); // Draw a circle
			ctx.save(); // Save the image
			ctx.clip(); // Cut the sheet so that you can only write in this circle
			ctx.closePath(); // Close last path
			ctx.drawImage(pdp, properties.pdp.image.x || 0, properties.pdp.image.y || 0, properties.pdp.image.size * 2 || 0, properties.pdp.image.size * 2 || 0); // Draw the member's profile picture
			
			const attachment = new AttachmentBuilder(image.toBuffer(), {name: `${member.user.tag.toLowerCase()}'s goodbye image.png`});
			await (member.guild.channels.cache.find(c => c.id === goodbye.channelId) as TextChannel).send({ files: [attachment] });
		} catch (err) { console.error(err); }
	}
}
module.exports = event;