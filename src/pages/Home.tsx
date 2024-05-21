import { Link } from "react-router-dom";
import { Container, Typography, Button, Box, CardMedia } from "@mui/material";
// import sigmaLogoBlack from "../assets/sigma-team-logo-black.svg";
// import sigmaLogoWhite from "../assets/sigma-team-logo-white.svg";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const quotes = [
  {
    text: "«You have to fight to reach your dream. You have to sacrifice and work hard for it.»",
    img: "src/assets/lionel-messi.jpg",
    name: "Lionel Messi",
  },

  {
    text: "«Football is played with your head. Your feet are just the tools.»",
    img: "src/assets/pirlo.jpg",
    name: "Andrea Pirlo",
  },

  {
    text: "«In football, the greatest satisfaction is winning when they say you can’t.»",
    img: "src/assets/lewandowski.jpg",
    name: "Robert Lewandowski",
  },

  {
    text: "«Football, like life, is filled with ups and downs, and the most important thing is to keep moving forward and never give up.»",
    img: "src/assets/maradona.jpg",
    name: "Diego Maradona",
  },

  {
    text: "«There is no pressure when you're making a dream come true.»",
    img: "src/assets/neymar.jpg",
    name: "Neymar Jr.",
  },
];

const HomePage = () => {
  const theme = useTheme();
  // const sigmaLogo = theme.palette.mode === "dark" ? sigmaLogoWhite : sigmaLogoBlack;

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handlePreviousQuote = () => {
    setCurrentQuoteIndex(
      (prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length
    );
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container sx={{ padding: 0 }}>
        {/* <Typography variant="h4" gutterBottom>
                    Welcome to sigma team website
                </Typography> */}
        {/* <Box sx={{ maxWidth: 300, margin: "0 auto" }}>
                    <CardMedia
                        component="img"
                        image={sigmaLogo}
                        alt="Sigma Team Logo"
                    />
                </Box> */}
        {/* <Typography paragraph>
                    This is the main page. Enjoy using our website.
                </Typography> */}
        <Box sx={{ position: "relative", height: 180, marginBottom: 2 }}>
          <TransitionGroup>
            <CSSTransition
              key={currentQuoteIndex}
              timeout={500}
              classNames={{
                enter: "quote-enter",
                enterActive: "quote-enter-active",
                exit: "quote-exit",
                exitActive: "quote-exit-active",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  transition: "opacity 500ms, transform 500ms",
                  "&.quote-enter": {
                    opacity: 0,
                    transform: "translateY(-10px)",
                  },
                  "&.quote-enter-active": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                  "&.quote-exit": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                  "&.quote-exit-active": {
                    opacity: 0,
                    transform: "translateY(10px)",
                  },
                }}
              >
                <Typography variant="h6" paragraph>
                  {quotes[currentQuoteIndex].text}
                </Typography>
                <CardMedia
                  component="img"
                  image={quotes[currentQuoteIndex].img}
                  alt="Footballer"
                  sx={{
                    margin: "0 auto",
                    width: theme.spacing(30),
                    height: theme.spacing(30),
                    objectFit: "cover",
                    marginTop: theme.spacing(1),
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="h6" paragraph>
                  {quotes[currentQuoteIndex].name}
                </Typography>
              </Box>
            </CSSTransition>
          </TransitionGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mb: 2,
            mt: theme.spacing(11),
          }}
        >
          <Button variant="contained" onClick={handlePreviousQuote}>
            <KeyboardDoubleArrowLeftIcon />
          </Button>
          <Button variant="contained" onClick={handleNextQuote}>
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </Box>
        <Box
          gap={1}
          sx={{
            display: "flex",
            maxWidth: 500,
            margin: "0 auto",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            component={Link}
            to="/stadium"
            variant="contained"
            color="primary"
            sx={{ flex: 1 }}
          >
            Move to stadium form page
          </Button>
          <Button
            component={Link}
            to="/match"
            variant="contained"
            color="primary"
            sx={{ flex: 1 }}
          >
            Move to match form page
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default HomePage;
