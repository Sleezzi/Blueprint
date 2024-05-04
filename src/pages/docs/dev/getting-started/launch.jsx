import { Link } from "react-router-dom";

import styles from "../../../../cdn/css/docs/docs_index.module.css";

export default function Launch() {
    return (
        <>
            <h1>RedEye - Launch</h1>
            <div className={styles.container}>
                <p>To start the bot, you had to paste this command&nbsp;</p>
                <pre className={styles.small}>$ npm start</pre>
                <p>&nbsp;in the terminal.</p>
            </div>
            <div className={styles.note}>If you don't want to have to do the command constantly you can create a <i>start.bat</i> file with the command inside</div>
            <h3 style={{textAlign: "center"}}>Now you are good, your bot is running. You can now personalize the bot!</h3>
            <div className={styles.nav}>
                <Link rel="noopener noreferrer" to="/docs/gettings-started/config.json">Previous</Link>
            </div>
        </>
    );
}