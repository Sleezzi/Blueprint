import PrismCode from "../../../../components/code";

export default function CreateCommand() {
    return (
        <>
            <h1>Create an order</h1>
            <p>There are 2 types of order:
            <li>Application commands</li>
            <li>Prefix commands</li>
            </p>
            <p>These commands are used differently and are therefore constructed differently</p>
            <h2>Prefix commands</h2>
            <p>Prefix commands are used in chat, to use them you put a prefix in front of a command (by default the bot prefix is ​​<i>!</i>)</p>
            <p>To create add a new prefix command you must create a file in <i>/commands/prefix</i></p>
            <p>Here is what this file should contain</p>
            <PrismCode plugins={["line-numbers"]} language="ts">{`import { CommandPrefix } from "../../interfacies";
const command: CommandPrefix = {
    name: "ping", // The name of the command
    description: "Répond pong", // A description of what the command does, this will be given to the user in the help command
    category: "Misc", // The command category
    execute(message, client) { // The function that will be executed
        ...
    }
}
module.exports = commandModule;`}</PrismCode>
            <h2>Application commands</h2>
            <p>There are several types of application commands, but here we will only talk about <i>ChatInputCommandInteraction</i></p>
            <p>To create and add a new application command you must create a file in <i>/commands/slash</i></p>
            <p>This is what the file should contain</p>
            <PrismCode plugins={["line-numbers"]} language="ts">{
`import { EmbedBuilder, GuildMember, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
    data: new SlashCommandBuilder() // We are going to use the SlashCommandBuilder class to make the command, there are many options that we have not included, you can find them [here](https://discord.com/developers/docs/interactions/application-commands)
    .setName("banlist") // Here we will put the name of the command
    .setNameLocalizations({ // Here we will put the name of the command in several languages
        "en-US": "banlist", // The name of the command in English
        fr: "banliste" // The name of the command in French
    })
    .setDescription("Returns the list of all banned members from the server") // Ici nous allons mettre la description de la command
    .setDescriptionLocalizations({ // Here we will put the description of the command in several languages (see [the list of available languages](https://discord.com/developers/docs/reference#locales))
        "en-US": "Returns the list of all banned members from the server", // The description of the command in English
        fr: "Renvoie la liste de tout les membres bannie du serveur" // The description of the command in French
    }),
    async execute(interaction, client, reply) { // The function that will be executed
        try {
            ...
        } catch(err) { return err; }
    }
}

module.exports = commandExport;`}</PrismCode>
        </>
    );
}