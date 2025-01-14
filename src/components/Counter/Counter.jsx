import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateUtils";

import styles from "./Counter.module.css";

const Counter = () => {
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timePassed, setTimePassed] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounterData = async () => {
      try {
        const response = await axios.get(
          "https://countdown-app-backend-eeb0.onrender.com/data"
        );
        const { timeRemaining, timePassed, startDate } = response.data;
        setFormattedStartDate(formatDate(startDate)); 
        setTimeRemaining(formatTime(timeRemaining));
        setTimePassed(formatTime(timePassed));
        setError(null);
      } catch (error) {
        setError(null); // Сбрасываем ошибку
        setTimeRemaining(null); // Обнуляем время при ошибке
        setTimePassed(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCounterData();

    const interval = setInterval(fetchCounterData, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    if (!ms || ms < 0) return ["00", "00", "00", "00"];
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600))
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    return [days, hours, minutes, seconds];
  };

  const labels = ["Days", "Hours", "Minutes", "Seconds"];

  return (
    <div className={styles.counterContainer}>
      <h1 className={styles.counterTitle}>Sobriety Counter</h1>
      <div className={styles.profile}>
        <img
          className={styles.avatar}
          src="/Natalka.png"
          alt="girl"
          width="60"
          height="60"
        />
        <div className={styles.info}>
          <p>
            <span>Name:</span> Nataliia
          </p>
          <p>
            <span>Birth:</span> May 24, 1993
          </p>
          <p>
            <span>Started:</span> {formattedStartDate}
          </p>
        </div>
      </div>
      <div className={styles.data}>
        {loading ? (
          <div className={styles.spinner}></div>
        ) : error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : timeRemaining === null && timePassed === null ? (
          <p className={styles.timeDisplay}>The counter hasn't started</p>
        ) : (
          <>
            <div className={styles.timeDisplayContainer}>
              <p className={styles.timeLabel}>Time Left</p>
              <div className={styles.timeValue}>
                {timeRemaining &&
                  timeRemaining.map((value, index) => (
                    <div key={index} className={styles.timeCard}>
                      <div className={styles.timeNumber}>{value}</div>
                      <div className={styles.timeLabelBelow}>
                        {labels[index]}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.timeDisplayContainer}>
              <p className={styles.timeLabel}>Time Elapsed</p>
              <div className={styles.timeValue}>
                {timePassed &&
                  timePassed.map((value, index) => (
                    <div key={index} className={styles.timeCard}>
                      <div className={styles.timeNumber}>{value}</div>
                      <div className={styles.timeLabelBelow}>
                        {labels[index]}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Counter;
