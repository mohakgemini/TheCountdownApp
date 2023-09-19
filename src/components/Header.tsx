import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  header: {
    backgroundColor: "#333",
    padding: "20px",
    textAlign: "center",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
  },
  title: {
    fontSize: "3.5rem",
    backgroundImage:
      "linear-gradient(109.6deg, rgb(255, 78, 80) 11.2%, rgb(249, 212, 35) 100.2%)",
    WebkitBackgroundClip: "text",
    fontWeight: 900,
    margin: "0",
    WebkitTextFillColor: "transparent",
  },
  "@media (max-width: 768px)": {
    title: {
      fontSize: "2rem",
    },
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <h1 className={classes.title}>The Countdown App</h1>
    </header>
  );
};

export default Header;
