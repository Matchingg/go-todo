import React, { useState, useEffect } from "react";
import styles from "./Pomodoro.module.css";

interface PomodoroProps {
  workMinutes?: number;
  breakMinutes?: number;
}

const Pomodoro: React.FC<PomodoroProps> = ({
  workMinutes = 25,
  breakMinutes = 5,
}) => {
  const [time, setTime] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsWorkSession(!isWorkSession);
            setTime(isWorkSession ? breakMinutes * 60 : workMinutes * 60);
            return isWorkSession ? breakMinutes * 60 : workMinutes * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && timer) {
      clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, isWorkSession, breakMinutes, workMinutes]);

  useEffect(() => {
    const totalSeconds = isWorkSession ? workMinutes * 60 : breakMinutes * 60;
    setProgress(((totalSeconds - time) / totalSeconds) * 100);
  }, [time, isWorkSession, workMinutes, breakMinutes]);

  const toggleTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRunning(!isRunning);
  };

  const resetTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRunning(false);
    setTime(isWorkSession ? workMinutes * 60 : breakMinutes * 60);
    setProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBar}
        style={{ "--progress": progress } as React.CSSProperties}
      />
      <div className={styles.timerDisplay}>{formatTime(time)}</div>
      <button className={styles.toggleButton} onClick={toggleTimer}>
        {isRunning ? "Pause" : "Play"}
      </button>
      <button className={styles.resetButton} onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
};

export default Pomodoro;
