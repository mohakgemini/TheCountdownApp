import { useState, useEffect } from "react";

export const useCountdown = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    let interval: number | undefined;

    if (countdown !== null && countdown > 0 && !isPaused) {
      interval = setInterval(() => {
        setCountdown((currentCountdown) => currentCountdown! - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countdown, isPaused]);

  const startTimer = () => {
    setCountdown(10);
    setIsPaused(false);
  };

  const stopTimer = () => {
    setCountdown(null);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    countdown !== 0 && setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  return {
    countdown,
    isPaused,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
  };
};
