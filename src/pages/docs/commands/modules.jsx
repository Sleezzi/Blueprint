import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function Index() {
	return (
		<>
			<h1>RedEye - Commands: Modules</h1>
			<p>La commande <b>modules</b> permet de personaliser votre serveur en activant différent modules.</p>
			<div className={`${styles.permissionsContainer}`}>
				Only members with <i>Administrator</i> permissions can use this command.
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