import { ProfileEdit } from "../../interfacies";

const moduleExport: ProfileEdit = {
	image: "./cdn/img/christmas.png",
	type: "banner",
	username: "RedEye [🎄]",
	condition: new Date().getMonth() === 11 && new Date().getDate() <= 24
}
module.exports = moduleExport;