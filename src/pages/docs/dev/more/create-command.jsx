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
            <h2>Les commandes d'application</h2>
            <p>Il existe plusieurs type de commande d'application, mais ici on ne parlera que des <i>ChatInputCommandInteraction</i></p>
            <p>Pour créer et ajouter une nouvelle commande d'application il faut créer un fichier dans <i>/commands/slash</i></p>
            <p>Voici ce que doit contenir le fichier</p>
            <PrismCode plugins={["line-numbers"]} language="ts">{
`import { EmbedBuilder, GuildMember, SlashCommandBuilder } from "discord.js";
import { CommandSlash } from "../../interfacies";

const commandExport: CommandSlash = {
    data: new SlashCommandBuilder() // Nous allons utiliser la class SlashCommandBuilder pour faire la command, il y a de nombreuse options que nous n'avons pas mis, vous pouvez les retrouver [ici](https://discord.com/developers/docs/interactions/application-commands)
    .setName("banlist") // Ici nous allons mettre le nom de la command
    .setNameLocalizations({ // Ici nous allons mettre le nom de la command en plusieurs langue
        "en-US": "banlist", // Le nom de la command en anglais
        fr: "banliste" // Le nom de la commande en français
    })
    .setDescription("Returns the list of all banned members from the server") // Ici nous allons mettre la description de la command
    .setDescriptionLocalizations({ // Ici nous allons mettre la desription de la command en plusieurs langue (voir [la liste des langues disponibles](https://discord.com/developers/docs/reference#locales))
        "en-US": "Returns the list of all banned members from the server", // La description de la commande en anglais
        fr: "Renvoie la liste de tout les membres bannie du serveur" // La description de la commande en français
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