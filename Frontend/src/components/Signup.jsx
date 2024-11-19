import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import './style.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing up:", { username, password });

    try {
      // Send the signup data to the backend
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });

      // Check if signup was successful
      if (response.status === 201) {
        alert("Signup successful!");
        // Redirect to login page
        navigate("/login");
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
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
        <button type="submit">Signup</button>
      </form>
      <footer>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </footer>
    </div>
  );
};

export default Signup;
