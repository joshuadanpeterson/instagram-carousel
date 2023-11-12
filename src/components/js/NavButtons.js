// NavButtons.js
import React from "react";
import "../css/NavigationButtons.css"; // Import the CSS for navigation buttons

// This component renders the navigation buttons for the carousel
const NavButtons = ({
	onPrevClick, // Handler for previous button click
	onNextClick, // Handler for next button click
	onPlayPauseClick, // Handler for play/pause button click
	isAutoplaying, // State to determine if the carousel is autoplaying
}) => (
	<div className="nav-buttons">
		{/* Previous button to navigate to the previous slide */}
		<button className="slide-nav-button prev-button" onClick={onPrevClick}>
			{/* Icon to navigate to the previous slide */}
			<i className="bi bi-skip-start-circle"></i> 
		</button>
		{/* Next button to navigate to the next slide */}
		<button className="slide-nav-button next-button" onClick={onNextClick}>
			{/* Icon to navigate to the next slide */}
			<i className="bi bi-skip-end-circle"></i> 
		</button>
		{/* Play/Pause button to toggle the autoplay feature */}
		<button className="play-pause-button" onClick={onPlayPauseClick}>
			{isAutoplaying ? (
				// Icon to toggle the autoplay feature 
				<i className="bi bi-pause-circle"></i> 
			) : (
				// Icon for play if not autoplaying
				<i className="bi bi-play-circle"></i> 
			)}
		</button>
	</div>
);

export default NavButtons;
