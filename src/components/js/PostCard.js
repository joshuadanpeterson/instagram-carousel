// PostCard.js
import React, { useEffect, useRef, useState } from "react";
import { Card, CardMedia, CardContent, Grid } from "@mui/material";
import { styled } from "@mui/system";

import Caption from './Caption'; // Import the Caption component
import "../css/PostCard.css"; // Import styling for the PostCard

// StyledCard is a styled component that applies specific styles to the Card component from MUI
const StyledCard = styled(Card)(({ theme, isCurrent }) => ({
  margin: theme.spacing(2), // Apply margin around the card
  width: "100%", // Card takes full width of its container
  height: "100%", // Card takes full height of its container
  position: "relative", // Position relative for absolute positioned children
  transition: "transform 0.5s", // Smooth transition for any transform changes
  "& .caption-link, & .nav-button": {
    opacity: 0, // Initially hide caption and navigation buttons
    transition: "opacity 0.3s ease", // Smooth transition for opacity changes
  },
  "&:hover .caption-link, &:hover .nav-button": {
    opacity: isCurrent ? 1 : 0.7, // Show caption and buttons on hover, with reduced opacity if not the current card
  },
}));

// StyledCardMedia is a styled component for the media part of the card
const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: '100%', // Media takes full width of its container
  height: 'auto', // Height is set to auto to maintain aspect ratio
  "& .caption-link": {
    opacity: 0, // Initially hide caption
    transition: "opacity 0.3s ease", // Smooth transition for opacity changes
  },
  "&:hover .caption-link": {
    opacity: 1, // Show caption on hover
  },
}));

// PostCard component represents a single card in the carousel
const PostCard = ({
  post, // Post data passed as a prop
  isCurrent, // Boolean to indicate if this card is the current one in view
  onHoverEnter, // Function to handle hover enter event
  onHoverLeave, // Function to handle hover leave event
  cardSize, // Object with width and height for the card
}) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const [fontSize, setFontSize] = useState('1em'); // State to track font size for responsive design
  const imageRef = useRef(null); // Ref to the image element for size calculations

  // Function to adjust the font size based on the size of the image
  const adjustFontSize = () => {
    if (imageRef.current) {
      const width = imageRef.current.offsetWidth; // Get the current width of the image
      const newFontSize = width / 100; // Calculate new font size based on image width
      setFontSize(`${newFontSize}px`); // Set the new font size
    }
  };

  // Effect to adjust font size on mount and when the window is resized
  useEffect(() => {
    adjustFontSize(); // Call on mount to set initial size
    window.addEventListener('resize', adjustFontSize); // Adjust when window is resized
    return () => window.removeEventListener('resize', adjustFontSize); // Cleanup on unmount
  }, []);

  return (
    <>
      <Grid item xs={4} sm={6} md={8}>
        <StyledCard
          raised // Apply shadow to the card for better visibility
          onMouseEnter={isCurrent ? onHoverEnter : undefined} // Only apply hover events if current
          onMouseLeave={isCurrent ? onHoverLeave : undefined}
          sx={{ ...cardSize }} // Apply size passed as prop
        > 
          <div 
            className="carousel-slide-container" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          > 
            <StyledCardMedia
              component="img"
              image={post.media_url} // Image URL from the post data
              alt={`Instagram post by ${post.username}`} // Alt text for the image
              sx={{ width: '100%', height: 'auto' }} // Apply full width and auto height for aspect ratio
              ref={imageRef} // Attach ref to the image for size calculations
              onLoad={adjustFontSize} // Adjust font size when image loads
            />
            <CardContent>
              <Caption 
                post={post} // Pass post data to Caption
                isHovered={isHovered} // Pass hover status to Caption
                isCurrent={isCurrent} // Pass current status to Caption
                fontSize={fontSize} // Pass calculated font size to Caption
              />
            </CardContent>
          </div>
        </StyledCard>
      </Grid>
    </>
  );
};

export default PostCard;
