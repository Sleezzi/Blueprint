import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/docs/Header";
import Sidnav from "../components/docs/Sidenav";

import styles from "../cdn/css/docs/docs_index.module.css";

function Docs() {
    const [sidenavIsOpen, setSidenavIsOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    useEffect(() => {
        try {
            document.body.setAttribute("theme", theme);
            localStorage.setItem("theme", theme);
        } catch (err) {
            console.error(err);
        }
    }, [theme]);
    
    return (
        <div className={styles.root}>
            <Header sidenavIsOpen={sidenavIsOpen} setSidenavIsOpen={setSidenavIsOpen} theme={theme} setTheme={setTheme} />
            <div className={styles.content}>
                <Sidnav sidenavIsOpen={sidenavIsOpen} />
                <main>
                    <div>
                        <div className={styles.warning}>
                            The <b>!modules</b> command is very slow to load, it takes a few seconds to respond. The problem will be resolved in approximately {new Date(Date.now() / 100 - 1716644759959).getDate()} days.
                        </div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Docs;