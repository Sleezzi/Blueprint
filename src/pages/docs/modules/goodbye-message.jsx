import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function GoodbyeMessage() {
    return (
        <>
            <h1>RedEye - Modules: Goodbye Message</h1>
            <p>This module allows you to activate the automatic sending of messages in a specific channel each time a member leaves your server.</p>
            <h2>Enable</h2>
            <p>To activate this module, you must issue the command <b>!modules</b>, then select <b>📤 goodbye</b> and finally by sending the message starting with the mention of the channel</p>
            <div className={styles.note}>
                To desactivate the module, do not mention a channel.
            </div>
            <h2>Preview</h2>
            <p>Here is a preview of the message</p>
            <img src="/cdn/img/redeyes_goodbye_image.png" alt="Goodbye Aperçu Message" style={{width: "100%"}} />
        </>
    );
}