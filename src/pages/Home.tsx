import {Link} from "react-router-dom";
import {Container, Typography, Button, Box, CardMedia} from "@mui/material";
import sigmaLogoBlack from "../assets/sigma-team-logo-black.svg";
import sigmaLogoWhite from "../assets/sigma-team-logo-white.svg";
import {useTheme} from "@mui/material/styles";

const HomePage = () => {
    const theme = useTheme();
    const sigmaLogo =
        theme.palette.mode === "dark" ? sigmaLogoWhite : sigmaLogoBlack;
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
            <Container sx={{padding: 0}}>
                <Typography variant="h4" gutterBottom>
                    Welcome to sigma team website
                </Typography>
                <Box sx={{maxWidth: 300, margin: "0 auto"}}>
                    <CardMedia
                        component="img"
                        image={sigmaLogo}
                        alt="Sigma Team Logo"
                    />
                </Box>
                <Typography paragraph>
                    This is the main page. Enjoy using our website.
                </Typography>
                <Box
                    gap={1}
                    sx={{
                        display: "flex",
                        maxWidth: 500,
                        margin: "0 auto",
                        flexDirection: {xs: "column", sm: "row"},
                    }}
                >
                    <Button
                        component={Link}
                        to="/stadium"
                        variant="contained"
                        color="primary"
                        sx={{flex: 1}}
                    >
                        Move to stadium form page
                    </Button>
                    <Button
                        component={Link}
                        to="/match"
                        variant="contained"
                        color="primary"
                        sx={{flex: 1}}
                    >
                        Move to match form page
                    </Button>
                </Box>
            </Container>
        </Container>
    );
};

export default HomePage;
