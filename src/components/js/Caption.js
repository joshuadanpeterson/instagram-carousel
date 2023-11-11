// Caption.js
import React from "react";
import { Typography } from "@mui/material";

const Caption = ({ post, isHovered, isCurrent }) => (
	<Typography
		variant="body2"
		color="textSecondary"
		component="p"
		className={`caption-card ${isHovered && isCurrent ? "visible" : ""}`}
		sx={{ position: "absolute", bottom: 0, width: "100%" }}
	>
		{/* This anchor tag acts as a caption and a permalink */}
		<a
			href={post.permalink}
			target="_blank"
			rel="noopener noreferrer"
			className="caption-link"
		>
			{post.caption || "View on Instagram"}
		</a>
	</Typography>
);

export default Caption;
