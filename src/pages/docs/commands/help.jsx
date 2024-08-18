import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function Index() {
	return (
		<>
			<h1>RedEye - Commands: Help</h1>
			<p>The <b>help</b> command allows you to see the list of commands available on your server. You can use it by doing <b>/help</b> or <b>!help</b></p>
			<h2>Response:</h2>
			<p>The response will be a <a href="https://discordjs.guide/popular-topics/embeds.html#embed-preview" target="_blank" rel="noopener noreferrer">Embed</a>, under the Embed there will be a drop-down menu where you can find all the command categories.</p>
			<p>There are 3 types of order:</p>
			<li>Moderation</li>
			<li>Game</li>
			<li>Misc</li>
			<div className={`${styles.permissionsContainer} ${styles.open}`}>
				Anyone can use this command: it does not require any special authorization. <icon className={styles.check}></icon>
			</div>
			<h2>Options:</h2>
			<table>
				<thead>
					<tr>
					<th scope="col">Option</th>
					<th scope="col">Description</th>
					<th scope="col">Required</th>
					<th scope="col">Model</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Command</th>
						<td>The name of the command you want help for</td>
						<td><icon className={styles.cross}></icon></td>
						<td>-</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}