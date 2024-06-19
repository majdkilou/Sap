import React from 'react';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Devies Reads</h1>
      <p>Discover and share your favorite books with others. Join our community and start your reading journey today!</p>
      <div className="home-buttons">
        <a href="/register" className="btn">Sign Up</a>
        <a href="/login" className="btn">Login</a>
      </div>
    </div>
  );
};

export default Home;
