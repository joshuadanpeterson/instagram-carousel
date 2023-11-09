import React, { useState, useEffect } from "react";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { config } from "react-spring";
import "../css/InstagramFeed.css";
import "../css/NavigationButtons.css";

const InstagramFeed = ({ accessToken }) => {
	const [posts, setPosts] = useState([]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [hoveredSlide, setHoveredSlide] = useState(null);
	const [isAutoplayed, setIsAutoplayed] = useState(false);

	useEffect(() => {
		fetch(
			`https://graph.instagram.com/me/media?fields=id,media_type,permalink,media_url,caption&access_token=${accessToken}`
		)
			.then((response) => response.json())
			.then((data) => {
				setPosts(data.data);
			});
	}, [accessToken]);

	// Autoplay functionality
	useEffect(() => {
		let autoplayInterval;
		if (isAutoplayed && posts.length > 0) {
			autoplayInterval = setInterval(() => {
				setCurrentSlide(
					(currentSlide) => (currentSlide + 1) % posts.length
				);
			}, 3000); // Change slide every 3 seconds
		}
		return () => {
			clearInterval(autoplayInterval);
		};
	}, [isAutoplayed, posts.length, currentSlide]);

	// Handler to toggle play/pause
	const togglePlayPause = () => {
		console.log("togglePlayPause clicked");
		setIsAutoplayed(!isAutoplayed);
	};

	// Function to go to the previous slide
	const goToPreviousSlide = (event) => {
		event.stopPropagation();
		console.log("Previous button clicked"); // Add this line to check if the function is called
		setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : posts.length - 1);
	};

	// Function to go to the next slide
	const goToNextSlide = (event) => {
		event.stopPropagation();
		console.log("Next button clicked"); // Add this line to check if the function is called
		setCurrentSlide((currentSlide + 1) % posts.length);
	};

	const slides = posts.map((post, index) => ({
		key: uuidv4(),
		content: (
			<div
				className="carousel-slide-container"
				onMouseEnter={() => {
				// Only trigger the hover effect if the hovered slide is the current slide
				if (index === currentSlide) {
					setHoveredSlide(index);
				}
				}}
				onMouseLeave={() => {
				// Remove the hover effect when the mouse leaves
				if (index === currentSlide) {
					setHoveredSlide(null);
					}
				}}
			>
				<img src={post.media_url} alt={`Instagram post ${index + 1}`} />
				<div
					className={`caption-card ${
						hoveredSlide === index ? "visible" : ""
					}`}
				>
					<a
						href={post.permalink}
						target="_blank"
						rel="noopener noreferrer"
						className="caption-link"
					>
						{post.caption}
					</a>
				</div>

				{/* Conditionally render the navigation buttons based on hover and active slide */}
				{hoveredSlide === index && index === currentSlide && (
					<>
						<button
							type="button"
							className="slide-nav-button prev-button"
							onClick={(event) => goToPreviousSlide(event)}
						>
							<i className="fas fa-chevron-left"></i>
						</button>
						<button
							type="button"
							className="slide-nav-button next-button"
							onClick={(event) => goToNextSlide(event)}
						>
							<i className="fas fa-chevron-right"></i>
						</button>
					</>
				)}

				{/* Play/Pause button, also only visible for the top slide */}
				{hoveredSlide === index && index === currentSlide && (
						<button
						type="button"
						className="play-pause-button"
						onClick={togglePlayPause}
						>
						<i className={`fas ${isAutoplayed ? "fa-pause" : "fa-play"}`}></i>
						</button>
				)}
				</div>
			),
			onClick: () => setCurrentSlide(index),
			}));

	return (
		<div style={{ width: "80%", height: "500px", margin: "0 auto" }}>
			<Carousel
				slides={slides}
				goToSlide={currentSlide}
				offsetRadius={2}
				showNavigation={false}
				animationConfig={config.gentle}
				autoPlay={true}
			/>
		</div>
	);
};

export default InstagramFeed;