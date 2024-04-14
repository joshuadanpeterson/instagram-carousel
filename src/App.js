// App.js is the root component of the React application. It orchestrates the layout and state management for the Instagram Carousel app.

// Importing necessary React hooks and components
import React, { useState, useRef } from "react";
import InstagramFeed from "./components/js/InstagramFeed";
import Footer from "./components/js/Footer";
import Header from "./components/js/Header";
import NavButtons from "./components/js/NavButtons";

// Importing CSS for App and Navigation Buttons
import "./App.css";
import "./components/css/NavigationButtons.css";

// Importing Firebase SDK for app initialization and analytics
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration object containing keys and identifiers for the app
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initializing Firebase with the provided configuration
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// The main App component definition
const App = () => {
  // Access token for the Instagram API
  const accessToken = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;

  // State hook for autoplay functionality
  const [isAutoplayed, setIsAutoplayed] = useState(false);
  // Ref hook to reference the carousel component for controlling navigation
  const carouselRef = useRef(null);

  // Function to navigate to the previous slide
  const goToPreviousSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.goToPreviousSlide();
    }
  };

  // Function to navigate to the next slide
  const goToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.goToNextSlide();
    }
  };

  // Function to toggle the autoplay state and control the carousel's play/pause
  const togglePlayPause = () => {
    setIsAutoplayed(!isAutoplayed);
    if (carouselRef.current) {
      carouselRef.current.togglePlayPause();
    }
  };

  // Rendering the main app structure with header, Instagram feed, navigation buttons, and footer
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

// Exporting App component to be used in index.js
export default App;
