import { Link } from "react-router-dom";
import { Container, Typography, Button, Box, CardMedia } from "@mui/material";
import sigmaLogoBlack from "../assets/sigma-team-logo-black.svg";
import sigmaLogoWhite from "../assets/sigma-team-logo-white.svg";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HomePreloader from "../components/HomePreloader";
import Messi from "../assets/lionel-messi.jpg";
import Pirlo from "../assets/pirlo.jpg";
import Lewandowski from "../assets/lewandowski.jpg";
import Maradona from "../assets/maradona.jpg";
import Nayman from "../assets/neymar.jpg"
import Field from "../assets/field2.jpg";
import Icon1 from "../assets/friendship_1.png";
import Icon2 from "./src/assets/stadium_1.png";

const quotes = [
  {
    text: "«You have to fight to reach your dream. You have to sacrifice and work hard for it.»",
    img: Messi,
    name: "Lionel Messi",
  },
  {
    text: "«Football is played with your head. Your feet are just the tools.»",
    img: Pirlo,
    name: "Andrea Pirlo",
  },
  {
    text: "«In football, the greatest satisfaction is winning when they say you can’t.»",
    img: Lewandowski,
    name: "Robert Lewandowski",
  },
  {
    text: "«Football, like life, is filled with ups and downs, and the most important thing is to keep moving forward and never give up.»",
    img: Maradona,
    name: "Diego Maradona",
  },
  {
    text: "«There is no pressure when you're making a dream come true.»",
    img: Nayman,
    name: "Neymar Jr.",
  },
];

const HomePage = () => {
  const theme = useTheme();
  const sigmaLogo =
    theme.palette.mode === "dark" ? sigmaLogoWhite : sigmaLogoBlack;

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
    <>
      <HomePreloader />
      <Box
        sx={{
          position: "relative",
          height: "auto",
          width: "100%",
          marginBottom: 2,
          padding: 3,
          borderRadius: 2,
          overflowX: "hidden",
          "::before": {
            content: '""',
            position: "absolute",
            opacity: "0.7",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${Field})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            zIndex: -1,
            // filter: "blur(4px)",
          },
        }}
      >
        <Container
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            maxWidth: "100%",
            overflowX: "hidden",
          }}
        >
          <Container
            sx={{
              py: theme.spacing(10),
              border: "2px solid",
              height: "35vw",
              width: "35vw",
              minWidth: theme.spacing(52),
              minHeight: theme.spacing(52),
              maxHeight: "50%",
              color: `${theme.palette.mode === "dark" ? "#fff" : "#000"}`,
              borderRadius: "10%",
              background: `${
                theme.palette.mode === "dark"
                  ? "linear-gradient(91.7deg, rgb(50, 25, 79) -4.3%, rgb(122, 101, 149) 101.8%)"
                  : "radial-gradient(circle at 7.1% 15.6%, rgb(22, 160, 133) 0%, rgb(64, 240, 206) 100.3%)"
              }`,
            }}
          >
            <Box
              sx={{
                maxWidth: 300,
                minWidth: 100,
                margin: "0 auto",
                "@media screen and (max-width: 768px)": {
                  height: theme.spacing(40),
                  width: theme.spacing(40),
                },
              }}
            >
              <CardMedia
                component="img"
                image={sigmaLogo}
                alt="Sigma Team Logo"
              />
            </Box>
          </Container>
        </Container>
      </Box>
      <Box
        sx={{
          width: "100%",
          border: `5px solid ${theme.palette.custom.quotesColor}`,
          position: "absolute",
          top: "104vh",
        }}
      ></Box>

      <Box
        sx={{
          position: "relative",
          height: "100%",
          marginBottom: 2,
          color: theme.palette.custom.quotesColor,
        }}
      >
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
                marginTop: theme.spacing(20),
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
              <Box
                sx={{
                  width: "70%",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  borderRadius: theme.spacing(5),
                  paddingTop: theme.spacing(15),
                  marginBottom: theme.spacing(25),
                }}
              >
                <Typography
                  variant="h6"
                  paragraph
                  sx={{
                    margin: "0 auto",
                    textAlign: "center",
                    width: "50%",
                  }}
                >
                  {quotes[currentQuoteIndex].text}
                </Typography>
                <Box
                  sx={{
                    border: "1px solid",
                    width: "50%",
                    margin: "0 auto",
                    mt: theme.spacing(13),
                    mb: theme.spacing(7),
                  }}
                ></Box>
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
                <Typography
                  variant="h6"
                  paragraph
                  sx={{
                    margin: "0 auto",
                  }}
                >
                  {quotes[currentQuoteIndex].name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    mb: 2,
                    mt: theme.spacing(10),
                  }}
                >
                  <Button variant="contained" onClick={handlePreviousQuote}>
                    <KeyboardDoubleArrowLeftIcon />
                  </Button>
                  <Button variant="contained" onClick={handleNextQuote}>
                    <KeyboardDoubleArrowRightIcon />
                  </Button>
                </Box>
              </Box>
            </Box>
          </CSSTransition>
        </TransitionGroup>
      </Box>

      <Box
        gap={1}
        sx={{
          display: "flex",
          width: theme.spacing(80),
          margin: "0 auto",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: 'space-between',
          "@media screen and (max-width: 768px)": {
            width: theme.spacing(40),
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: theme.spacing(40),
            mt: theme.spacing(2)

          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${Icon1})`,
              height: theme.spacing(12),
              width: theme.spacing(12),
              backgroundSize: "cover",
              backgroundPosition: "center",
              margin: "0 auto",
              border: `3px solid black`,
              borderRadius: '50%',
              mb: theme.spacing(1),
              "@media screen and (max-width: 768px)": {
                mt: theme.spacing(2),
                display: 'none'
              },
            }}
          ></Box>
          <Button
            component={Link}
            to="/stadium"
            variant="contained"
            color="primary"
            sx={{ flex: 1, textAlign: 'center'}}
          >
            Match Form Page
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: theme.spacing(40),
            mt: theme.spacing(2),
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${Icon2})`,
              height: theme.spacing(12),
              width: theme.spacing(12),
              backgroundSize: "cover",
              backgroundPosition: "center",
              margin: "0 auto",
              border: `3px solid black`,
              borderRadius: '50%',
              mb: theme.spacing(1),
              "@media screen and (max-width: 768px)": {
                mt: theme.spacing(2),
                display: 'none'
              },
            }}
          ></Box>
        <Button
          component={Link}
          to="/match"
          variant="contained"
          color="primary"
          sx={{ flex: 1, textAlign: 'center' }}
        >
          Stadium Form Page
        </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
