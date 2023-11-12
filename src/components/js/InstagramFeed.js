import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";
import Carousel from "react-spring-3d-carousel"; // 3D carousel component
import { v4 as uuidv4 } from "uuid"; // UUID for unique key generation
import { config } from "react-spring"; // Animation configurations
import { styled } from "@mui/system"; // MUI utility for styling
import { Grid } from "@mui/material"; // MUI layout component

import PostCard from "./PostCard"; // Custom component for displaying individual posts
import "../css/InstagramCarousel.css"; // Styles for the carousel
import "../css/NavigationButtons.css"; // Styles for navigation buttons

// Styled component for the carousel wrapper with MUI's 'styled' utility
const CarouselWrapper = styled("div")({
	display: "flex",
	justifyContent: "center", // Centers the carousel horizontally
	alignItems: "center", // Centers the carousel vertically
	minHeight: "100vh", // Ensures it takes at least the full height of the viewport
	perspective: "1000px", // Adds a 3D effect to the carousel
});

// The InstagramFeed component, using forwardRef to allow parent components to call its methods
const InstagramFeed = forwardRef(({ accessToken }, ref) => {
	const [posts, setPosts] = useState([]); // State for storing the posts
	const [currentSlide, setCurrentSlide] = useState(0); // State for the current slide
	const [hoveredSlide, setHoveredSlide] = useState(null); // State for the hovered slide
	const [isAutoplayed, setIsAutoplayed] = useState(true); // State for autoplay functionality

	// Fetch posts from Instagram on component mount using the provided access token
	useEffect(() => {
		fetch(
			`https://graph.instagram.com/me/media?fields=id,media_type,permalink,media_url,caption&access_token=${accessToken}`
		)
			.then((response) => response.json())
			.then((data) => {
				setPosts(data.data); // Update the posts state with fetched data
			});
	}, [accessToken]);

	// Set up autoplay functionality for the carousel
	useEffect(() => {
		let autoplayInterval;
		if (isAutoplayed && posts.length > 0) {
			autoplayInterval = setInterval(() => {
				setCurrentSlide(
					(currentSlide) => (currentSlide + 1) % posts.length
				);
			}, 3000); // Change slide every 3 seconds
		}
		return () => clearInterval(autoplayInterval); // Clear interval on component unmount
	}, [isAutoplayed, posts.length, currentSlide]);

	// Handlers for navigating slides manually
	const goToPreviousSlide = () => {
		setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : posts.length - 1);
	};

	const goToNextSlide = () => {
		setCurrentSlide((currentSlide + 1) % posts.length);
	};

	// Handler for toggling autoplay on and off
	const togglePlayPause = () => {
		setIsAutoplayed(!isAutoplayed);
	};

	// Expose methods to parent component via ref for external control
	useImperativeHandle(ref, () => ({
		goToPreviousSlide,
		goToNextSlide,
		togglePlayPause,
	}));

	// Map posts to slides and filter out any null slides
	const slides = posts
		.map((post, index) => {
			// Only create slides for the current, previous, and next posts for performance
			if (
				index === currentSlide ||
				index === (currentSlide + 1) % posts.length ||
				index === (currentSlide - 1 + posts.length) % posts.length
			) {
				return {
					key: uuidv4(), // Unique key for each slide
					content: (
						<PostCard
							post={post}
							cardSize={{ width: "300%", height: "auto" }}
							hovered={hoveredSlide === index}
							isCurrent={index === currentSlide}
							onMouseEnter={() => setHoveredSlide(index)}
							onMouseLeave={() => setHoveredSlide(null)}
							onPrevClick={goToPreviousSlide}
							onNextClick={goToNextSlide}
							onPlayPauseClick={togglePlayPause}
							isAutoplayed={isAutoplayed}
						/>
					),
					onClick: () => setCurrentSlide(index), // Set the current slide on click
				};
			} else {
				return null; // Exclude slides that are not adjacent to the current slide
			}
		})
		.filter((slide) => slide !== null); // Remove any null slides to prevent errors

	return (
		<CarouselWrapper style={{ marginLeft: "auto", marginRight: "auto" }}>
			<Grid
				container
				spacing={2} // Grid spacing for layout consistency
				justifyContent="center"
				alignItems="center"
				style={{ height: "100%" }}
			>
				<Carousel
					slides={slides}
					goToSlide={currentSlide}
					offsetRadius={2}
					showNavigation={false}
					animationConfig={config.gentle}
					autoPlay={isAutoplayed} // Autoplay state passed to the Carousel component
				/>
			</Grid>
		</CarouselWrapper>
	);
});

export default InstagramFeed;
