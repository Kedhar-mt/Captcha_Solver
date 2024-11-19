import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      console.log("Login successful:", response.data);
      // Assuming login success returns a message like "Login successful"
      alert(response.data);  // Show success message (optional)
      // Redirect to home page or another page after successful login
      navigate(`/${username}`);
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
      
      // Check if the server sends an error message, else use a default message
      alert(error.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <footer>
        <p>Don't have an account? <a href="/signup">Signup</a></p>
      </footer>
    </div>
  );
};

export default Login;
