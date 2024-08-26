import { ProfileEdit } from "../../interfacies";

const moduleExport: ProfileEdit = {
	image: "./cdn/img/halloween.png",
	type: "banner",
	username: "RedEye [🎃]",
	condition: new Date().getMonth() === 9
}
module.exports = moduleExport;