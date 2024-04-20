import styles from "../../../cdn/css/docs/docs_index.module.css";

export default function Index() {
    return (
        <>
            <h1>RedEye - Commands: removeBannedWord</h1>
            <p>The <b>removeBannedWord</b> command allows you to delete a word present in your personalized list</p>
            <div className={`${styles.permissionsContainer}`}>
                Only members with <i>ModerateMembers</i> permissions can use this command.
            </div>
            <div className={styles.warning}>
                The command is not available with the prefix. Only the <b>/</b> command exists and works
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
                        <th scope="row">Word</th>
                        <td>The word that should be added to the filter</td>
                        <td><icon className={styles.check}></icon></td>
                        <td><i>String</i></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}