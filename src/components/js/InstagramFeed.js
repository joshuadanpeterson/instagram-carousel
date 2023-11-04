import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../css/InstagramFeed.css'; // Make sure this is the correct path to your CSS file

const InstagramFeed = ({ accessToken }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(
            `https://graph.instagram.com/me/media?fields=id,media_type,permalink,media_url,caption&access_token=${accessToken}`
        )
        .then((response) => response.json())
        .then((data) => {
            setPosts(data.data);
        });
    }, [accessToken]);

    return (
        <Carousel 
			showArrows={true} 
			dynamicHeight={false} 
			infiniteLoop={true} 
			autoPlay={true}
			showThumbs={false}>
            {posts.map((post) => (
                <div key={post.id} className="carousel-slide-container">
                    <img src={post.media_url} alt="Instagram post" />
                    <div className="caption-card">
                        <a
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="caption-link"
                        >
                            {post.caption}
                        </a>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default InstagramFeed;
