import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function BlockLink() {
	return (
		<>
			<h1>RedEye - Modules: Block Link</h1>
			<p>When this module is enabled, future messages containing links will be deleted and resent without the link.</p>
			<div className={styles.note}>
				When the module is activated, an <i>allow link</i> role is created. If a member has this role, he will be able to send messages containing links.
			</div>
		</>
	);
}