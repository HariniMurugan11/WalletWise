import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import your CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token); // Store token in localStorage
      navigate('/transactions');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('User does not exist. Please register.');
      } else if (error.response && error.response.status === 401) {
        setErrorMessage('Incorrect password. Please try again.');
      } else {
        setErrorMessage('Login error. Please try again.');
      }
    }
  };

  return (
    <div>
      
         
    <div className="container">
    <h1>Welcome to WalletWise!</h1>
  
      <div className="form">
       
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="button1">
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="register-link">
          No account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
