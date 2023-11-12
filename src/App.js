// App.js is the main component of the application. It is responsible for rendering the InstagramFeed component, and displaying the navigation buttons. It also handles the logic for the navigation buttons, and passes the appropriate props to the InstagramFeed component.

// App.js Imports
import React, { useState, useRef } from 'react';
import InstagramFeed from './components/js/InstagramFeed';
import Footer from './components/js/Footer';
import Header from './components/js/Header';
import NavButtons from './components/js/NavButtons';

import "./App.css";
import "./components/css/NavigationButtons.css"

// Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// App.js 
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