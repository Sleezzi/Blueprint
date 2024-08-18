import { Link } from "react-router-dom";

import styles from "../../cdn/css/docs/docs_index.module.css";

export default function Docs() {
	return (
		<>
			<h1 style={{ color: "var(--a-color)", WebkitTextStroke: "1px black" }}>RedEye</h1>
			<p>RedEye is an OpenSource bot made in TypeScript, its code can be found on <a href="https://github.com/Sleezzi/RedEye">Github</a>, however, its development <a href="https://sleezzi.fr">Sleezzi</a> sometimes you don't follow this logic and make code a little complicated. This is why this website is here, it allows you to better understand how the bot was designed and how it works.</p>
			<p>The documentation pages arrive gradually, we do our best to help you but sometimes we don't have time. If you have any questions, don't hesitate to ask them on our <a href="/server">Discord server</a></p>
			<div className={styles.warning}>
				RedEye is an OpenSource bot, but it was not initially designed as such, so some parts may be complex or not optimized. If you encounter an issue, you can report it <a href="/server">here</a> or <a href="https://github.com/Sleezzi/RedEye/issues" target="_blank" rel ="noreferrer"> here</a>
			</div>
			<br></br>
			<div className={styles.nav}>
				<Link to="/docs/gettings-started/code-recovery" rel="noopener noreferrer">Start up</Link>
			</div>
		</>
	);
}