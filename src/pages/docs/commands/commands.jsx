import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function Index() {
    return (
        <>
            <h1>RedEye - Commands: commands</h1>
            <p>The <b>commands</b> command allows you to deactivate/enable a command on the server</p>
            <div className={`${styles.permissionsContainer}`}>
                Only members with <i>ModerateMembers</i> permissions can use this command.
            </div>
            <div className={styles.warning}>
            The prefix command to disable a command is <b>disablecmd</b> and to re-enable it is <b>enablecmd</b>
            </div>
            <h2>Options for the command <b>/</b>:</h2>
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
                        <th scope="row">Command</th>
                        <td>The command</td>
                        <td><icon className={styles.check}></icon></td>
                        <td><i>String</i></td>
                    </tr>
                    <tr>
                        <th scope="row">Action</th>
                        <td>The action you want to perform: deactivate, activate or view the status of the command</td>
                        <td><icon className={styles.check}></icon></td>
                        <td><i>Disable</i>, <i>Enable</i> or <i>Status</i></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}