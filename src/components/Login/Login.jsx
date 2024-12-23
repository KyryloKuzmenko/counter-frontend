import axios from "axios";
import { useState } from "react";

import styles from "./Login.module.css"

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://countdown-app-backend-eeb0.onrender.com/login",
        { username, password }
      );
      setToken(response.data.token);
      setError("");
    } catch (error) {
      setError("Authorization error. Check your login and password.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Entrance for Admin</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="text"
          placeholder="Admin name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>
          Enter
        </button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Login;
