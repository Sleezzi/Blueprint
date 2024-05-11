import { Link } from "react-router-dom";

import styles from "../../../../cdn/css/docs/docs_index.module.css";

export default function ConfigJson() {
    return (
        <>
            <h1>Config.json</h1>
            <p>To make RedEye work, you need to create and complete a <i>config.js</i> file</p>
            <p>This is what it should look like</p>
            <pre lang="json">
        {`{
    "token": "Your bot's token",`}<i> =&gt;  The token can be found on <a href="https://discord.com/developers/applications">Discord developers</a></i>{`
    "prefix": "!",`}<i> =&gt; The prefix of the bot, by default it is "!" but it can be changed</i>{`
    "ownerId": "542703093981380628",`}<i> =&gt; Your Discord ID</i>{`
    "ownerServer": "1200750236277157999",`}<i> =&gt; Your Discord server ID</i>{`
    "firebase": {`}<i> =&gt; By default, the bot uses Firebase to store its data, if you do not want to use it then change the database.ts code</i>{`
        ... `}<i>=&gt; All the code can be found on <a href="http://firebase.google.com" target="_blank" rel="noopener noreferrer">FireBase</a> in the project settings</i>{`
    }
}`}
            </pre>
            <div className={styles.nav}>
                <Link rel="noopener noreferrer" to="/docs/gettings-started/dev/download-modules">Previous</Link>
                <Link rel="noopener noreferrer" to="/docs/gettings-started/dev/launch">Next</Link>
            </div>
        </>
    );
}