// Header.js

import React from "react";
import "../css/Header.css"; // Importing Header CSS for styling

// Header functional component
const Header = () => {
	return (
		// Header container
		<header className="header">
			{/* Title of the Header */}
			<h1 className="header-title">InstaDreamscape</h1>
		</header>
	);
};

export default Header; // Exporting Header for use in other components
