import { Link } from "react-router-dom";
import CodeBlock from "../../../../components/code";

import styles from "../../../../cdn/css/docs/docs_index.module.css";

export default function ConfigJson() {
    return (
        <>
            <h1>Config.json</h1>
            <p>To make RedEye work, you need to create and complete a <i>config.json</i> file</p>
            <p>This is what it should look like</p>
            <CodeBlock plugins={["line-numbers"]} language="json">
        {`{
    "token": "Your bot's token", // The token can be found on [Discord App](https://discord.com/developers/applications)
    "prefix": "!", // The prefix of the bot, by default it is "!" but it can be changed
    "ownerId": "542703093981380628", // Your Discord ID
    "ownerServer": "1200750236277157999", // Your Discord server ID
    "firebase": { // By default, the bot uses Firebase to store its data, if you do not want to use it then change the database.ts code
        ... // All the code can be found on [Firebase](https://firebase.google.com) in the project settings
    }
}`}
            </CodeBlock>
            <div className={styles.nav}>
                <Link rel="noopener noreferrer" to="/docs/gettings-started/dev/download-modules">Previous</Link>
                <Link rel="noopener noreferrer" to="/docs/gettings-started/dev/launch">Next</Link>
            </div>
        </>
    );
}