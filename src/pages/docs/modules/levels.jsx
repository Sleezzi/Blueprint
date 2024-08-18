import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function Levels() {
	return (
		<>
			<h1>RedEye - Modules: Levels</h1>
			<p>This module allows you to activate/deactivate the leveling system.</p>
			<h2>How it's work?</h2>
			<p>For each message that a member sends, an XP point is added. Arrive at a certain XP level, a level is added to the member and the XP points are reset to zero.</p>
			<div className={styles.note}>
			For a member to move to the next level, they must have 150 times their XP level. <i>Ex: A member is level 2, so they will need 300 experience points to move to level 3.</i>
			</div>
			<div className={styles.note}>
			When you activate the module, a role <b>"no exp"</b> is created. If a member has this role, they will no longer have any experience points.
			</div>
			<h2>How to do</h2>
			<p>To activate this module, you must do the <b>!modules</b> command, selecting the <b>⭐ levels</b> module and clicking on activate.</p>
			<h2>Here is an example response to the <i>!level</i> command</h2>
			<img src="/cdn/img/redeyes_level_image.png" alt="Goodbye Aperçu Message" style={{width: "100%"}} />
		</>
	);
}