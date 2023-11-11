import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { config } from "react-spring";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";

import PostCard from "./PostCard"; // Import PostCard component
// 
import "../css/InstagramCarousel.css";
import "../css/NavigationButtons.css";

const CarouselWrapper = styled("div")({
	display: "flex",
	justifyContent: "center", // Centers the cards horizontally
	alignItems: "center", // Centers the cards vertically
	minHeight: "100vh", // Make sure it takes at least the full height of the viewport
	perspective: "1000px", // Adjust as needed for 3D effect
});

const InstagramFeed = forwardRef(({ accessToken }, ref) => {

	const [posts, setPosts] = useState([]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [hoveredSlide, setHoveredSlide] = useState(null);
	const [isAutoplayed, setIsAutoplayed] = useState(true); // Initialize this as true if you want autoplay by default

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
		return () => clearInterval(autoplayInterval);
	}, [isAutoplayed, posts.length, currentSlide]);

	const goToPreviousSlide = () => {
		setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : posts.length - 1);
	};

	const goToNextSlide = () => {
		setCurrentSlide((currentSlide + 1) % posts.length);
	};

	const togglePlayPause = () => {
		setIsAutoplayed(!isAutoplayed);
	};

	useImperativeHandle(ref, () => ({
		goToPreviousSlide,
		goToNextSlide,
		togglePlayPause,
	}));

	// Modify your slides to use PostCard
	const slides = posts
		.map((post, index) => {
			if (index === currentSlide) {
				return {
					key: uuidv4(),
					content: (
						<PostCard
							post={post}
							cardSize={{ width: "300%", height: "auto" }}
							hovered={hoveredSlide === index}
							isCurrent={true}
							onMouseEnter={() => setHoveredSlide(index)}
							onMouseLeave={() => setHoveredSlide(null)}
							onPrevClick={goToPreviousSlide}
							onNextClick={goToNextSlide}
							onPlayPauseClick={togglePlayPause}
							isAutoplayed={isAutoplayed}
						/>
					),
					onClick: () => setCurrentSlide(index),
				};
			} else if (
				index === (currentSlide + 1) % posts.length ||
				index === (currentSlide - 1 + posts.length) % posts.length
			) {
				return {
					key: uuidv4(),
					content: (
						<PostCard
							post={post}
							cardSize={{ width: "300px", height: "auto" }}
							hovered={hoveredSlide === index}
							isCurrent={false}
							onMouseEnter={() => setHoveredSlide(index)}
							onMouseLeave={() => setHoveredSlide(null)}
							onPrevClick={goToPreviousSlide}
							onNextClick={goToNextSlide}
							onPlayPauseClick={togglePlayPause}
							isAutoplayed={isAutoplayed}
						/>
					),
					onClick: () => setCurrentSlide(index),
				};
			} else {
				return null;
			}
		})
		.filter((slide) => slide !== null); // Filter out null slides

	return (
		<CarouselWrapper style={{ marginLeft: "auto", marginRight: "auto" }}>
			<Grid
				container
				spacing={2} // Use a number for spacing
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
					autoPlay={isAutoplayed} // Use the state variable here
				/>
			</Grid>
		</CarouselWrapper>
	);
});

export default InstagramFeed;
