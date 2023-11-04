import React from 'react';
import InstagramFeed from './components/js/InstagramFeed'; // Adjust the path as necessary
import Footer from './components/js/Footer';
import Header from './components/js/Header'; // Import the Header component

const App = () => {
  // Here you can define your access token or get it from .env
  const accessToken = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;

  return (
    <div className="App">
      <Header />
      <InstagramFeed accessToken={accessToken} /> {/* Pass the accessToken as a prop to the InstagramFeed component */}
      <Footer />
    </div>
  );
};

export default App;
