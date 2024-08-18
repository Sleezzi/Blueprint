import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function Index() {
	return (
		<>
			<h1>RedEye - Commands: clean</h1>
			<p>The <b>clean</b> command allows you to delete all bot messages in a room.</p>
			<div className={`${styles.permissionsContainer}`}>
				Only members with <i>ManageMessages</i> permissions can use this command.
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
						<th scope="row">-</th>
						<td>-</td>
						<td>-</td>
						<td>-</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}