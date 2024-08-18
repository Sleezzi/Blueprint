import { Link } from "react-router-dom";
import styles from "../../../cdn/css/docs/docs_index.module.css";
import { useState } from "react";

export default function AutoModerateMessage() {
	const [list, setList] = useState([]);
	fetch("https://raw.githubusercontent.com/Sleezzi/RedEye/Bot/automod.json")
	.then(response => response.json())
	.then(response => setList(response));
	return (
		<>
			<h1>RedEye - Modules: Auto-Moderate Message</h1>
			<p>Automatically moderate messages with this module.</p>
			<h2>How it's work?</h2>
			<p>There is a predefined list of words which can be activated by the owner, the owner can also add words which will be added to a filter list. If a message sent by a member contains a word present in the list, the message will be deleted and the bot will resend the message in a censored version (without the forbidden word)</p>
			<h2>Default list</h2>
			<p>To activate the default list, do the <b>!modules</b> command, then select the <b>🚫auto-moderate message</b> module. To finish, simply click on the “Activate” button to activate it. (<i>Disable</i> to desactivate it)</p>
			<h2>Custom list</h2>
			<p>To add a word from your list, click <Link to="/#/add-banned-word">here</Link></p>
			<p>To delete a word from your list, click <Link to="/#/remove-banned-word">here</Link></p>
			<div className={styles.note}>
				For the personalized list there is no need to activate this module.
			</div>
			<h2>List of words</h2>
			<div>
				{
					list.map((word, index) => <div key={index}>{word}</div>)
				}
			</div>
		</>
	);
}