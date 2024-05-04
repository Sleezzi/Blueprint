import { Link } from "react-router-dom";

import styles from "../../../../cdn/css/docs/docs_index.module.css";

export default function GetRecovery() {
    return (
        <>
            <h1>RedEye - Get Code</h1>
            <h2>With Git</h2>
            <p>To retrieve the bot code, you must go to <a href="https://github.com/Sleezzi/RedEye">RedEye's GitHub</a></p>
            <p>Then click on the <b style={{background: "#238636", padding: ".5rem 1rem", borderRadius: ".4rem", fontFamily: "inherit", fontSize: "80%", cursor: "not-allowed", color: "white"}}>&lt; &gt; Code ▾</b> button and on the <i>Copy</i> button</p>
            <p>Ensuite, ouvrez un terminal et collez la commande dedans.</p>
            <br></br>
            <h2>Without Git</h2>
            <p><a href="https://github.com/Sleezzi/RedEye/archive/refs/heads/Bot.zip">Click here</a> to download the zip file</p>
            <div className={styles.nav}>
                <Link rel="noopener noreferrer" to="/docs/gettings-started/download-modules">Next</Link>
            </div>
        </>
    );
}