// Caption.js
import React from "react";
import { Typography } from "@mui/material";

// Caption functional component for displaying post captions
const Caption = ({ post, isHovered, isCurrent, fontSize }) => (
	// Typography component from Material-UI for text styling
	<Typography
		variant="body2" // Text style variant
		color="textSecondary" // Text color
		component="p" // Render as a paragraph
		className={`caption-card ${isHovered && isCurrent ? "visible" : ""}`} // Conditional class for visibility
		sx={{
			position: "absolute",
			bottom: 0,
			width: "100%",
			fontSize: fontSize,
		}} // Inline styles for positioning and font size
	>
		{/* Anchor tag for the caption that also serves as a link to the original post */}
		<a
			href={post.permalink} // URL to the original Instagram post
			target="_blank" // Opens link in a new tab
			rel="noopener noreferrer" // Security measure for opening new tabs
			className="caption-link" // Class for styling the link
		>
			{post.caption || "View on Instagram"}{" "}
			{/*Display caption text or default text */}
		</a>
	</Typography>
);

export default Caption; // Exporting Caption for use in other components
