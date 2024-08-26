import { ProfileEdit } from "../../interfacies";

const moduleExport: ProfileEdit = {
	image: "./cdn/img/valentine_s_day.png",
	username: "RedEye [❤️]",
	type: "banner",
	condition: new Date().getMonth() === 1 && new Date().getDate() <= 13
}

module.exports = moduleExport;