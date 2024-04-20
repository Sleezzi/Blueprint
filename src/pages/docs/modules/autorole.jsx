import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function GetRecovery() {
    return (
        <>
            <h1>RedEye - Modules: Autorole</h1>
            <p>This module allows you to automatically add a role to the new member of your server.</p>
            <p>To activate this module, you must issue the command <b>!modules</b>, then select <img src="/cdn/img/emote/member.png" alt="emote" /> and finally by sending the message starting with the mention of the role</p>
            <div className={styles.note}>
                To desactivate the module, do not mention a role.
            </div>
        </>
    );
}