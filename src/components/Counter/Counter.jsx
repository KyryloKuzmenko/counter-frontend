import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Counter.module.css";

const Counter = () => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timePassed, setTimePassed] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounterData = async () => {
      try {
        const response = await axios.get(
          "https://countdown-app-backend-eeb0.onrender.com/data"
        );
        const { timeRemaining, timePassed } = response.data;
        setTimeRemaining(timeRemaining);
        setTimePassed(timePassed);
        setError(null);
      } catch (error) {
        setError(null);
        setTimeRemaining(null); // Устанавливаем `null` для времени, если сброшено
        setTimePassed(null);
      }
    };

    fetchCounterData();

    const interval = setInterval(fetchCounterData, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    if (!ms || ms < 0) return "0 days : 0 hours : 0 minutes : 0 seconds";
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days} days : ${hours} hours : ${minutes} minutes : ${seconds} seconds`;
  };

  return (
    <div className={styles.counterContainer}>
      <h1 className={styles.counterTitle}>Sobriety counter</h1>
      {error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : timeRemaining === null && timePassed === null ? (
        <p className={styles.timeDisplay}>The counter hasn't started</p>
      ) : (
        <>
          <div className={styles.timeDisplayContainer}>
            <p className={styles.timeLabel}>Time left:</p>
            <p className={styles.timeValue}>{formatTime(timeRemaining)}</p>
          </div>
          <div className={styles.timeDisplayContainer}>
            <p className={styles.timeLabel}>Time elapsed:</p>
            <p className={styles.timeValue}>{formatTime(timePassed)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Counter;
