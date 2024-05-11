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

    const [date, setDate] = useState(Date.now());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setDate(Date.now());
        }, 1000);
        
        return () => clearInterval(intervalID);
    }, [date]);

    const days = Math.floor((1716644759959 - date) / 86400000);
    const hours = Math.floor(((1716644759959 - date) % 86400000) / 3600000);
    const minutes = Math.floor(((1716644759959 - date) % 3600000) / 60000);
    const secondes = Math.floor(((1716644759959 - date) % 60000) / 1000);

    const getDate = () => {
        const texts = [];
        if (days) texts.push(`${days} day${days > 1 ? "s" : ""}`);
        if (hours) texts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
        if (minutes) texts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
        if (secondes) texts.push(`${secondes} seconde${secondes > 1 ? "s" : ""}`);
        return texts.join(", ").replace(/,([^,]*)$/, " &$1");
    }
    return (
        <div className={styles.root}>
            <Header sidenavIsOpen={sidenavIsOpen} setSidenavIsOpen={setSidenavIsOpen} theme={theme} setTheme={setTheme} />
            <div className={styles.content}>
                <Sidnav sidenavIsOpen={sidenavIsOpen} />
                <main>
                    <div>
                        <div className={styles.warning}>
                            The <b>!modules</b> command is very slow to load, it takes a few seconds to respond. The problem will be resolved in <b>{getDate()}</b>.
                        </div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Docs;