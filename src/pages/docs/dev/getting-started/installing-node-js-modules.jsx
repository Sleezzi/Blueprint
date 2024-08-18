import { Link } from "react-router-dom";
import CodeBlock from "../../../../components/code";

import styles from "../../../../cdn/css/docs/docs_index.module.css";

export default function InstallingNodeJsModules() {
	return (
		<>
			<h1>RedEye - Download Node.js modules</h1>
			<div className={styles.container}>
				<p>Open a terminal and enter the command&nbsp;</p>
				<CodeBlock className={styles.small} language="shell">npm i</CodeBlock>
				<p>&nbsp;to download all Node.js modules.</p>
			</div>
			<div className={styles.note}>
				We use <a href="https://firebase.google.com" target="_blank" rel="noreferrer">Firebase</a> to record user data (tickets, level, etc.), for this we need the <i>firebase-admin</i> module, if you choose something else for saving data you can uninstall it by doing <CodeBlock className={styles.small} language="shell">npm uninstall firebase-admin</CodeBlock>
			</div>
			<div className={styles.nav}>
				<Link rel="noopener noreferrer" to="/docs/gettings-started/dev/code-recovery">Previous</Link>
				<Link rel="noopener noreferrer" to="/docs/gettings-started/dev/config.json">Next</Link>
			</div>
		</>
	);
}