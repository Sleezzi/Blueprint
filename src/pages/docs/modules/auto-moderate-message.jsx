import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function GetRecovery() {
    return (
        <>
            <h1>RedEye - Modules: Auto-Moderate Message</h1>
            <p>Automatically moderate messages with this module.</p>
            <h2>How it's work?</h2>
            <p>There is a predefined list of words which can be activated by the owner, the owner can also add words which will be added to a filter list. If a message sent by a member contains a word present in the list, the message will be deleted and the bot will resend the message in a censored version (without the forbidden word)</p>
            <h2>Default list</h2>
            <p>To activate the default list, you must issue the <b>!modules</b> command, then select <img src="/cdn/img/emote/speech_balloon.svg" alt="emote" /> and finally sending the message <i>Enable</i> (<i>Disable</i> to deactivate it)</p>
            <h2>Add words to your list</h2>
            <p>To add banned words to your list, you must do the command <b>/addbannedword</b> and enter the banned word in the <i>word</i></p> option.
            <div className={styles.note}>
                The bot supports <a href="https://fr.wikipedia.org/wiki/Regular_Expression" target="_blank" rel="noopener noreferrer">regular expressions</a> (RegExp), if your word is a RegExp, put true in the <i>RegExp</i> option
            </div>
            <div className={styles.warning}>
                The command is not available with the prefix. Only the <b>/</b> command exists and works
            </div>
        </>
    );
}