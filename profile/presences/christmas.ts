import { ActivityType } from "discord.js";
module.exports = {
	name: "Merry Christmas • 🎄",
	type: ActivityType.Watching,
	url: "https://redeye.sleezzi.fr",
	state: "Bot made by Sleezzi",
	condition: new Date().getMonth() === 11 && new Date().getDate() <= 24
}