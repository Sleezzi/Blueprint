import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from "../../cdn/css/docs/sidenav.module.css";

function App({ sidenavIsOpen }) {
	const developpeMenu = (e) => {
		if (e.target.parentNode.className === styles.active) {
			e.target.parentNode.classList.remove(styles.active);
		} else {
			e.target.parentNode.classList.add(styles.active);
		}
	}
	const [nav, setNav] = useState({});

	useEffect(() => {
		fetch('/cdn/docs.json') // Assurez-vous de changer le chemin selon votre configuration
		.then(response => response.json())
		.then(data => setNav(data));
	}, []);

	const renderButton = (index, value, parent) => {
		return (
		<Link key={value} to={`${parent.toLowerCase().replaceAll(" ", "-")}/${value}`}>{index}</Link>
		);
	};

	const renderChild = (index, value) => {
		return (
			<li key={index}>
				<p onClick={developpeMenu}>{index}</p>
				<ul>
					<li>
						{Object.entries(value).map(([key, val]) => {
							return typeof val === 'string' ? renderButton(key, val, index) : renderChild(key, val);
						})}
					</li>
				</ul>
			</li>
		);
	};

	return (
		<ul className={`${styles.sidenav} ${sidenavIsOpen ? styles.active : ""}`}>
			{Object.entries(nav).map(([index, value]) => {
				return typeof value === 'string' ? renderButton(index, value, ``) : renderChild(index, value);
			})}
		</ul>
	);
}

export default App;
