import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function GetRecovery() {
    return (
        <>
            <h1>RedEye - Modules: Goodbye Message</h1>
            <p>This module allows you to activate the automatic sending of messages in a specific channel each time a member joins your server.</p>
            <h2>Enable</h2>
            <p>To activate this module, you must issue the command <b>!modules</b>, then select <img src="/cdn/img/emote/inbox_tray.svg" alt="emote"/ > and finally by sending the message starting with the mention of the channel</p>
            <div className={styles.note}>
                You can put a personalized message after the mention of the channel, it will be added to the message which will be sent in the channel. To put the member's name in the message you can put <i>$user</i>. The personalized message will replace the "Welcome!" in the message
            </div><div className={styles.note}>
                To desactivate the module, do not mention a channel.
            </div>
            <h2>Preview</h2>
            <p>Here is a preview of the message</p>
            <img src="/cdn/img/redeyes_welcome_image.png" alt="Welcome Aperçu Message" style={{width: "100%"}} />
        </>
    );
}