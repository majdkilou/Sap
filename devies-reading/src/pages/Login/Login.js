import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const { login: loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      console.log('Login response:', response); // Debug the response
      if (response.accessToken) {
        const userData = {
          token: response.accessToken,
          userId: response.userId,
          username: credentials.username,
        };
        loginUser(userData); // Update the Auth context with user data
        setError(null); // Clear any previous errors
        navigate('/books'); // Redirect to book list
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
