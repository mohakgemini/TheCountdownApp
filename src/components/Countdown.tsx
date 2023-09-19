import { useCountdown } from "../hooks/useCountdown";
import { createUseStyles } from "react-jss";
import { useMemo } from "react";
import clsx from "clsx";

const useStyles = createUseStyles({
  timerContainer: {
    textAlign: "center",
  },
  countdown: {
    fontSize: "4em",
    textShadow: "1px 1px 4px #fff",
    fontWeight: "bold",
    zIndex: 2,
  },
  circle: {
    position: "relative",
    cursor: "pointer",
    width: "120px",
    height: "120px",
    lineHeight: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid transparent",
    borderColor: "#ff4e50",
  },
  backgroundCircle: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
    background: "linear-gradient(180deg, #f9d423 0%, #ff4e50 100%)",
    transition: "height 0.5s linear",
    height: ({ circleHeight }) => circleHeight,
  },
  button: {
    borderRadius: "8px",
    border: "1px solid transparent",
    padding: "0.6em 1.2em",
    fontSize: "1em",
    fontWeight: "700",
    backgroundColor: "#1a1a1a",
    cursor: "pointer",
    transition: "border-color 0.25s",
    "&:hover": {
      borderColor: "#ff4e50",
    },
    "@media (max-width: 768px)": {
      fontSize: "1.2em",
      padding: "0.7em 1.5em",
    },
  },
  pauseText: {
    zIndex: 15,
    padding: "2px",
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  paused: {
    opacity: "10%",
  },
  helpText: {
    left: 0,
    position: "fixed",
    padding: "10px",
    bottom: 80,
    fontSize: "1.1em",
    right: 0,
  },
});

export const Countdown = () => {
  const {
    countdown,
    isPaused,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
  } = useCountdown();

  const helpText = useMemo(() => {
    if (countdown === null)
      return ' Click the "Start Timer" button to begin the countdown.';
    if (countdown === 0)
      return "Click on the countdown timer to return to the start screen.";
    return isPaused
      ? "Move your mouse away to resume the countdown."
      : "Hover your mouse over the countdown timer to pause it. Click on the countdown timer to stop it and return to the start screen.";
  }, [countdown, isPaused]);

  const circleHeight =
    countdown !== null ? (1 - countdown / 10) * 100 + "%" : "100%";

  const classes = useStyles({ circleHeight });

  return (
    <main>
      {countdown !== null ? (
        <div className={classes.timerContainer}>
          <div
            className={classes.circle}
            onClick={stopTimer}
            onMouseEnter={pauseTimer}
            onMouseLeave={resumeTimer}
            role="button"
            tabIndex={0}
            aria-label="Countdown Timer"
            onKeyDown={(e) => {
              if (e.code === "Enter" || e.code === "Space") {
                e.preventDefault();
                stopTimer();
              }
            }}
          >
            <div
              className={clsx(
                classes.backgroundCircle,
                isPaused && classes.paused
              )}
            >
              <div className={classes.countdown}>{countdown}</div>
            </div>
            {isPaused && (
              <div
                className={classes.pauseText}
                aria-live="polite"
                role="status"
              >
                Paused...
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          className={classes.button}
          onClick={startTimer}
          aria-label="Start Timer"
        >
          Start Timer
        </button>
      )}
      <div className={classes.helpText}>{helpText}</div>
    </main>
  );
};
