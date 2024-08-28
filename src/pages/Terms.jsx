import { useEffect } from "react";
import styles from "../cdn/css/tos.module.css";
import { Link } from "react-router-dom";

function Terms() {
	return (
		<div className={styles.root}>
			<h1 className={styles.title}>Website & Application condition and terms of use</h1>
			<h1>Terms</h1>
			<h3>En utilisant les services Redeye, vous accèptez nos conditions d'utilisation.</h3>
			<br />
			<h1>Use license</h1>
			<h3>
				Les services RedEye sont Open Source géré par <a href="https://sleezzi.fr" target="_blank" rel="noopener noreferrer">Sleezzi Inc.</a> Le code de est disponible gratuitement sur <a href="https://github.com/Sleezzi/RedEye" target="_blank" rel="noopener noreferrer">Github</a>.
				<br />
				Vous pouvez le partager et modifer en respectant ces conditions :
			</h3>
			<ul>
				<li>Do not use RedEye for adult content</li>
				<li>Do not sell RedEye, if you want to share it it must be free;</li>
				<li>You must credit Sleezzi as the original author</li>
			</ul>
			<br />
			<h1>Disclaiment</h1>
			<h3>
				Tous les éléments présent sur les services RedEye sont fournis "tels quels". RedEye ne donne aucune garantie, expresse ou implicite, et annule donc toutes les autres garanties.
				<br/>
				En outre, RedEye ne fait aucune déclaration concernant l'exactitude ou la fiabilité de l'utilisation des éléments de ses services.
			</h3>
			<br />
			<h1>Limitations</h1>
			<h3>
				RedEye ou ses fournisseurs ne seront pas tenus responsables des dommages qui pourraient survenir suite à l'utilisation ou à l'impossibilité d'utiliser les éléments des services de RedEye, même si RedEye ou un représentant autorisé de ce site Web et de cette application a été informé, oralement ou par écrit, de la possibilité de tels dommages.
				<br />
				Certaines juridictions n'autorisent pas les limitations des garanties implicites ou les limitations de responsabilité pour les dommages accessoires, ces limitations peuvent ne pas s'appliquer à vous.
			</h3>
			<br />
			<h1>Links</h1>
			<h3>
				RedEye n'a pas vérifié tout les liens externes présent sur ses services et n'est pas résponsable de leurs contenus.
				La présence de lien n'implique pas l'approbation de RedEye.
				<br />
				The use of any linked website is at the user's own risk.
			</h3>
			<br />
			<h1>Terms of Use Modifications</h1>
			<h3>
				RedEye peut changer ses conditions d'utilisation de ses services à tout moment et sans préavis.
				<br />
				En utilisant les services de RedEye, vous accèptez d'être lié par la version actuelle des présentes conditions d'utilisation.
			</h3>
			<br />
			<h1>Law</h1>
			<h3>
				Toute réclamation relative aux services de RedEye sera régie par les lois de France sans égard à ses dispositions relatives aux conflits de lois.
			</h3>
		</div>
	)
}
export default Terms;