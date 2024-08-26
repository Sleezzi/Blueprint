import { ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js";
import { ContextMenu } from "../interfacies";

const moduleExport: ContextMenu = {
	data: new ContextMenuCommandBuilder()
	.setName("avatar")
	.setNameLocalizations({
		fr: "avatar",
		"en-US": "avatar"
	})
	.setType(ApplicationCommandType.User),
	async execute(interaction, client, reply) {
		try {
			const texts = client.translate(interaction.guild?.preferredLocale as string, "contextMenu/avatar");
			const member = interaction.guild?.members.cache.get(interaction.targetId);
			if (!member) {
				reply({ content: texts.errors || "-" });
				return;
			}
			
			reply({ content: `[${texts.this}](${member.user.avatarURL()}) ${texts.is} ${member.user.username}` });
		} catch (err) { console.error(err); }
	}
}

module.exports = moduleExport;