import { ProfileEdit } from "../../interfacies";

const moduleExport: ProfileEdit = {
	image: "./cdn/img/default.png",
	type: "banner",
	username: "RedEye",
	condition: () => {
		if (new Date().getMonth() === 1 && new Date().getDate() > 13) return false;
		if (new Date().getMonth() === 9) return false;
		if (new Date().getMonth() === 11 && new Date().getDate() > 24) return false;
		return true;
	}
}
module.exports = moduleExport;