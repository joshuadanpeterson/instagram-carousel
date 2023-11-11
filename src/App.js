import React, { useState, useRef } from 'react';
import InstagramFeed from './components/js/InstagramFeed';
import Footer from './components/js/Footer';
import Header from './components/js/Header';
import NavButtons from './components/js/NavButtons';

import "./App.css";
import "./components/css/NavigationButtons.css"

const App = () => {
  const accessToken = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;

  const [isAutoplayed, setIsAutoplayed] = useState(false); // Define isAutoplayed state
  const carouselRef = useRef(null); // Reference to the carousel

  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.goToPreviousSlide();
    }
  };

  const goToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.goToNextSlide();
    }
  };

  const togglePlayPause = () => {
    setIsAutoplayed(!isAutoplayed); // Toggle the isAutoplayed state
    if (carouselRef.current) {
      carouselRef.current.togglePlayPause();
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="InstagramFeed-container">
        <div className="InstagramFeed">
          <InstagramFeed 
            accessToken={accessToken} 
            ref={carouselRef} 
            onPrevClick={goToPreviousSlide}
            onNextClick={goToNextSlide}
            onPlayPauseClick={togglePlayPause}
            isAutoplaying={isAutoplayed}
          />
        </div>
      </div>
      <div className="NavButtons-container">
        <NavButtons 
          onPrevClick={goToPreviousSlide}
          onNextClick={goToNextSlide}
          onPlayPauseClick={togglePlayPause}
          isAutoplaying={isAutoplayed}      
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;