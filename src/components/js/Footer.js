// Footer.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import "../css/Footer.css"; // Importing Footer CSS for styling

// Footer functional component
const Footer = () => {
  return (
    // Footer container
    <footer className="footer">
      {/* Copyright notice */}
      <div className="copyright">Copyright © 2023</div>
      {/*Container for social media icons */}
      <div className="social-media-icons">
        {/* Instagram link and icon */}
        <a
          href="https://www.instagram.com/chromaticera/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        {/* LinkedIn link and icon */}
        <a
          href="https://www.linkedin.com/in/joshuadanpeterson/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
        </a>
       {/* GitHub link and icon */}
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

export default Footer; // Exporting Footer for use in other components
