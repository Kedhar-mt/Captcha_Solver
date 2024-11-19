import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams

const App = () => {
  const { username } = useParams(); // Access the 'username' from the URL params
  const [captcha, setCaptcha] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [coins, setCoins] = useState(0);

  const importantNotes = [
    "All words are case sensitive.",
    "Calculative CAPTCHAs must be solved.",
    "Length of the CAPTCHAs will be between 6 to 12 characters.",
    "The result can be negative numbers (e.g., 5 - 8 = -3).",
  ];

  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captchaString = "";
    const length = Math.floor(Math.random() * (12 - 6 + 1)) + 6; // Random length between 6 and 12
    for (let i = 0; i < length; i++) {
      captchaString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return captchaString;
  };

  useEffect(() => {
    const newCaptcha = generateCaptcha(); // Generate an initial CAPTCHA
    setCaptcha(newCaptcha); // Set the CAPTCHA text
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Answer:", userAnswer);
    console.log("Captcha:", captcha);

    if (userAnswer === captcha) {
      setCoins(coins + 10);
      console.log("Coins updated:", coins + 10);
      alert("Correct CAPTCHA! Coins updated.");
    } else {
      alert("Incorrect CAPTCHA, try again.");
    }

    // Generate a new CAPTCHA after submission
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    setUserAnswer(""); // Clear the input field
  };

  const handleSkip = () => {
    const newCaptcha = generateCaptcha(); // Generate a new CAPTCHA
    setCaptcha(newCaptcha); // Update the CAPTCHA text
    setUserAnswer(""); // Clear the input field
  };

  return (
    <div className="captcha-solver">
      <h1>Captcha Solver for {username}</h1> {/* Display username from URL */}
      <div>
        <div
          style={{
            border: "2px solid #000",
            padding: "20px",
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "bold",
            margin: "20px 0",
            backgroundColor: "#f0f0f0",
          }}
        >
          {captcha}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="captcha-input"
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter CAPTCHA answer"
          />
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
        <button className="skip-button" onClick={handleSkip}>
          Skip
        </button>
      </div>
      <div>
        <p className="coin-balance">Coins: {coins}</p>
      </div>
      <div>
        <h3>Important Notes:</h3>
        <ul className="important-notes">
          {importantNotes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
