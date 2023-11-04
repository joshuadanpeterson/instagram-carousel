import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faInstagram,
	faLinkedinIn,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "../css/Footer.css"; // Make sure to create a Footer.css file for styling

const Footer = () => {
	return (
		<footer className="footer">
			<div className="copyright">Copyright © 2023</div>
			<div className="social-media-icons">
				<a
					href="https://www.instagram.com/chromaticera/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FontAwesomeIcon icon={faInstagram} size="2x" />
				</a>
				<a
					href="https://www.linkedin.com/in/joshuadanpeterson/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FontAwesomeIcon icon={faLinkedinIn} size="2x" />
				</a>
				<a
					href="https://github.com/joshuadanpeterson"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FontAwesomeIcon icon={faGithub} size="2x" />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
