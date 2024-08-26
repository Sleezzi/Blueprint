import { PagesExpress } from "../interfacies";

const moduleExport: PagesExpress = {
	name: "Index",
	method: "GET",
	url: "/",
	execute(request, response, client) {
		try {
			response.redirect("https://redeye.sleezzi.fr");
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = moduleExport;