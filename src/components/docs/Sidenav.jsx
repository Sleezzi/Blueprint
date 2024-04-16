import { Link } from "react-router-dom";

import styles from "../../cdn/css/docs/sidenav.module.css";

export default function Sidenav({ sidenavIsOpen }) {
    const developpeMenu = (e) => {
        if (e.target.parentNode.className === styles.active) {
            e.target.parentNode.classList.remove(styles.active);
        } else {
            e.target.parentNode.classList.add(styles.active);
        }
    }
    return (
        <ul className={`${styles.sidenav} ${sidenavIsOpen ? styles.active : ""}`}>
            <li>
                <p onClick={developpeMenu}>Gettings started</p>
                <ul>
                    <li>
                        <Link to="/docs/gettings-started/code-recovery" rel="noopener noreferrer">Code recovery</Link>
                    </li>
                    <li>
                        <Link to="/docs/gettings-started/download-modules" rel="noopener noreferrer">Installing Node.js modules</Link>
                    </li>
                    <li>
                        <Link to="/docs/gettings-started/config.json" rel="noopener noreferrer">config.js</Link>
                    </li>
                    <li>
                        <Link to="/docs/gettings-started/launch" rel="noopener noreferrer">Launch</Link>
                    </li>
                </ul>
            </li>
            <li>
                <p onClick={developpeMenu}>How it's work</p>
                <ul>
                    <li>
                        <Link to="/docs/how-it's-work/folder-file-tree" rel="noopener noreferrer">Folder/File Tree</Link>
                    </li>
                </ul>
            </li>
            <Link to="/server" rel="noopener noreferrer">Help</Link>
        </ul>
    );
}