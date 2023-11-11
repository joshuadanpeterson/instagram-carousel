// NavButtons.js
import React from "react";
import "../css/NavigationButtons.css";

const NavButtons = ({
	onPrevClick,
	onNextClick,
	onPlayPauseClick,
	isAutoplaying,
}) => (
    
	<div className="nav-buttons">
		<button className="slide-nav-button prev-button" onClick={onPrevClick}>
            <i className="bi bi-skip-start-circle"></i>
		</button>
		<button className="slide-nav-button next-button" onClick={onNextClick}>
            <i className="bi bi-skip-end-circle"></i>
		</button>
		<button className="play-pause-button" onClick={onPlayPauseClick}>
            {isAutoplaying ? <i className="bi bi-pause-circle"></i> : <i className="bi bi-play-circle"></i>}
		</button>
	</div>
);

export default NavButtons;
