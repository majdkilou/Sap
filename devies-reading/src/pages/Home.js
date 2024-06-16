import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Book Tracker App</h1>
      <p>Track the books you have read, are currently reading, and want to read.</p>
      <div>
        <Link to="/books">
          <button>Explore Books</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
