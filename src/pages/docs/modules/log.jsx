import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function GetRecovery() {
    return (
        <>
            <h1>RedEye - Modules: Log</h1>
            <p>Sends a message like <a href="https://discordjs.guide/popular-topics/embeds.html#embed-preview" target="_blank" rel="noopener noreferrer">Embed</a> in a channel to create a history of server actions.</p>
            <h2>List of supported events</h2>
            <ul>
                <li>
                    Message sent <i>=&gt; a member sends a message to the server</i>
                </li>
                <li>
                    Modified message <i>=&gt; a member modifies one of his messages on the server</i>
                </li>
                <li>
                    Message deleted <i>=&gt; a member deletes a message on the server</i>
                </li>
                <li>
                channel created <i>=&gt; a new channel is created on the server</i>
                </li>
                <li>
                    Modified living channel <i>=&gt; a channel is modified on the server</i>
                </li>
                <li>
                    Salon deleted <i>=&gt; a channel is deleted on the server</i>
                </li>
                <li>
                    Join member <i>=&gt; a member joins the server</i>
                </li>
                <li>
                    Leave member <i>=&gt; a member leaves the server</i>
                </li>
            </ul>
            <p>To activate this module, you must issue the command <b>!modules</b>, then select <img src="/cdn/img/emote/robot.svg" alt="emote" /> and finally by sending the message starting with the mention of the channel</p>
            <div className={styles.note}>
                To desactivate the module, do not mention a channel.
            </div>
        </>
    );
}