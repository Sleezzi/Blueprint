import { Link } from "react-router-dom";
import styles from "../cdn/css/404.module.css";

export default function NotFound() {
    return (
        <div className={styles.root}>
            <svg>
                <clipPath id="text-overlay">
                    <text x="50%" y="50%" fill="white" textAnchor="middle">
                        Error 404
                    </text>
                </clipPath>
            </svg>
            <video src="/cdn/img/blueink.mp4" muted loop autoPlay></video>
            <h2 className={styles.pageNotFound}>Page not found</h2>
            <Link className={styles.getBack} to="/">Get back</Link>
        </div>
    );
}