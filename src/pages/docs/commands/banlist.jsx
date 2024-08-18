import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function Index() {
	return (
		<>
			<h1>RedEye - Commands: Banlist</h1>
			<p>The <b>banlist</b> command allows you to ban a member from a server. You can add a message which will be added to the ban.</p>
			<div className={`${styles.permissionsContainer}`}>
				Only members with <i>BanMember</i> permissions can use this command.
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