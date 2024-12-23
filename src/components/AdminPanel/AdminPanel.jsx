import axios from "axios";
import { useState } from "react";

import styles from "./AdminPanel.module.css"

const AdminPanel = ({ token }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleStart = async () => {
    
    try {
      const response = await axios.post(
        "https://countdown-app-backend-eeb0.onrender.com/start",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      setError("Failed to start the counter");
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.delete(
        "https://countdown-app-backend-eeb0.onrender.com/reset",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      setError("Failed to reset the counter");
      console.error(error);
    }
  };

  return (
    <div className={styles.adminPanel}>
      <h2 className={styles.panelTitle}>Admin panel</h2>
      <div className={styles.actionButtons}>
      <button onClick={handleStart} className={styles.button}>
        Start
      </button>
      <button onClick={handleReset} className={styles.button}>
        Reset
      </button>
      </div>
      {message && <p className={styles.message}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default AdminPanel;
