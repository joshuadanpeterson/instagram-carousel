// PostCard.js
import React, { useState } from "react";
import { Card, CardMedia, CardContent, Grid } from "@mui/material";
import { styled } from "@mui/system";

import Caption from './Caption';
import "../css/PostCard.css";


const StyledCard = styled(Card)(({ theme, isCurrent }) => ({
  margin: theme.spacing(2),
  width: "100%",
  height: "100%",
  position: "relative",
  transition: "transform 0.5s", // Smooth transition for 3D effect
  "& .caption-link, & .nav-button": {
    opacity: 0, // Start with caption and buttons hidden
    transition: "opacity 0.3s ease",
  },
  "&:hover .caption-link": {
    opacity: 1,
  },
  "&:hover .nav-button": {
    opacity: isCurrent ? 1 : 0.7, // Show the buttons on hover only for the current card
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  "& .caption-link": {
    opacity: 0, // Start with caption hidden
    transition: "opacity 0.3s ease",
  },
  "&:hover .caption-link": {
    opacity: 1, // Show the caption on hover
  },
}));

const PostCard = ({
  post,
  isCurrent,
  onHoverEnter,
  onHoverLeave,
  cardSize,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Grid item xs={4} sm={6} md={8}>
        <StyledCard
          raised
          onMouseEnter={isCurrent ? onHoverEnter : undefined}
          onMouseLeave={isCurrent ? onHoverLeave : undefined}
          sx={{ ...cardSize }}
        > 
          <div 
          className="carousel-slide-container" 
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
          > 
            <StyledCardMedia
              component="img"
              image={post.media_url}
              alt={`Instagram post by ${post.username}`} // Assuming 'username' is a property in 'post'
              sx={{ width: '100%', height: 'auto' }}
            />
            <CardContent>
              <Caption post={post} isHovered={isHovered} isCurrent={isCurrent} />
            </CardContent>
          </div>
        </StyledCard>
      </Grid>
    </>
  );
};

export default PostCard;
