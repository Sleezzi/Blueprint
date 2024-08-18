import styles from "../../cdn/css/docs/header.module.css";

import { Link } from "react-router-dom";

export default function Header({ sidenavIsOpen, setSidenavIsOpen, theme, setTheme }) {
	const toggleSidenav = () => {
		if (sidenavIsOpen) {
			setSidenavIsOpen(false);
		} else {
			setSidenavIsOpen(true);
		}
	}

	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}

	return (
		<header>
			<div onClick={toggleSidenav} className={styles.sidenavOpener}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<Link to="/docs/">
				<img src="/cdn/img/Logo/RedEye.png" alt="logo"></img>RedEye - Docs
			</Link>
			<button onClick={toggleTheme} className={styles.toggleTheme} title="Switch from dark mode to light mode">
				<span className="material-symbols-outlined">{`${theme}_mode`}</span>
			</button>
		</header>
	);
}