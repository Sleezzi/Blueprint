import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function Index() {
	return (
		<>
			<h1>RedEye - Commands: clear</h1>
			<p>The <b>clean</b> command allows you to delete a specific number of messages in a room.</p>
			<div className={`${styles.permissionsContainer}`}>
				Only members with <i>ManageMessages</i> permissions can use this command.
			</div>
			<div className={styles.note}>
				Due to Discord's restrictions, the maximum message the bot can delete at once is 100 messages.
			</div>
			<div className={styles.warning}>
				Due to Discord's restrictions, the bot cannot delete messages that are older than 14 days
			</div>
			<div className={styles.note}>
			You can select a member, the bot deletes all their messages in the room
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
						<th scope="row">Number</th>
						<td>The number of messages that the bot must delete (max: 100)</td>
						<td><icon className={styles.check}></icon></td>
						<td><i>Number</i></td>
					</tr>
					<tr>
						<th scope="row">Membre</th>
						<td>If selected, the bot only deletes messages from this member</td>
						<td><icon className={styles.cross}></icon></td>
						<td><i>@member</i></td>
					</tr>
				</tbody>
			</table>
		</>
	);
}