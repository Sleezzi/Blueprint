import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function Index() {
	return (
		<>
			<h1>RedEye - Commands: addBannedWord</h1>
			<p>The <b>addBannedWord</b> command allows you to add a word to the filter list. When a member of your server sends a message that contains a filter me the message is deleted and the bot resends the message in censored version.</p>
			<div className={`${styles.permissionsContainer}`}>
				Only members with <i>ModerateMembers</i> permissions can use this command.
			</div>
			<div className={styles.warning}>
				The command is not available with the prefix. Only the <b>/</b> command exists and works
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
						<th scope="row">Word</th>
						<td>The word that should be added to the filter</td>
						<td><icon className={styles.check}></icon></td>
						<td><i>String</i></td>
					</tr>
					<tr>
						<th scope="row">RegExp</th>
						<td>Select True if your self is a <a href="https://fr.wikipedia.org/wiki/Regular_Expression" target="_blank" rel="noopener noreferrer">regular expressions</a> (RegExp) and False if This is not one of them, if you don't know what a RegExp is, set False.</td>
						<td><icon className={styles.check}></icon></td>
						<td><i>True</i> or <i>False</i></td>
					</tr>
				</tbody>
			</table>
		</>
	);
}