import {
    Box,
    CardMedia,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import {
    SportsSoccer,
    Stadium,
    Sports,
    Search,
    Telegram,
    Email,
} from "@mui/icons-material";
import Root from "./Root";
import sigmaLogoBlack from "../assets/sigma-team-logo-black.svg";
import sigmaLogoWhite from "../assets/sigma-team-logo-white.svg";

const About = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const sigmaLogo =
        theme.palette.mode === "dark" ? sigmaLogoWhite : sigmaLogoBlack;
    const introText =
        "With our football experience and being football fans, we decided to create a project that allows you to create and track information about football events and their locations.";
    const stadiumText =
        "You can create a stadium with a name, city, capacity, and field type. You can also edit this information, reorder cards, or delete the stadium.";
    const matchText =
        "To create a match, you need to enter two teams, the number of tickets sold, and select one of the pre-added stadiums. Note that the number of tickets cannot exceed the capacity of the stadium. Of course, you can update, move, or delete match cards.";
    const searchText =
        "On the stadium search page, you can filter the stadium according to your preferences and see the matches that take place at each stadium. As the information about matches and stadiums is being edited, you may see a hint on the stadium map that the data is outdated and needs to be updated.";

    return (
        <>
            <Root />
            <Box sx={{mt: 15}}>
                <Typography textAlign="center" variant="h4" gutterBottom>
                    Team Sigma Project
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        {isSmallScreen ? (
                            <>
                                <Stack direction="row" spacing={0.5}>
                                    <SportsSoccer />
                                    <Typography paragraph>
                                        <strong>Project:</strong> {introText}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={0.5}>
                                    <Stadium />
                                    <Typography paragraph>
                                        <strong>Stadium:</strong> {stadiumText}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={0.5}>
                                    <Sports />
                                    <Typography paragraph>
                                        <strong>Match:</strong> {matchText}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={0.5}>
                                    <Search />
                                    <Typography paragraph>
                                        <strong>Stadium search:</strong>{" "}
                                        {searchText}
                                    </Typography>
                                </Stack>
                            </>
                        ) : (
                            <Timeline position="alternate-reverse">
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot
                                            sx={{
                                                backgroundColor:
                                                    theme.palette.primary.dark,
                                            }}
                                        >
                                            <SportsSoccer />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography
                                            variant="body1"
                                            textAlign="left"
                                        >
                                            {introText}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>

                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot
                                            sx={{
                                                backgroundColor:
                                                    theme.palette.primary.dark,
                                            }}
                                        >
                                            <Stadium />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography paragraph textAlign="left">
                                            <strong>Stadium:</strong>{" "}
                                            {stadiumText}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>

                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot
                                            sx={{
                                                backgroundColor:
                                                    theme.palette.primary.dark,
                                            }}
                                        >
                                            <Sports />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography paragraph textAlign="left">
                                            <strong>Match:</strong> {matchText}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>

                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot
                                            sx={{
                                                backgroundColor:
                                                    theme.palette.primary.dark,
                                            }}
                                        >
                                            <Search />
                                        </TimelineDot>
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography paragraph textAlign="left">
                                            <strong>Stadium search:</strong>{" "}
                                            {searchText}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            </Timeline>
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{maxWidth: 300, margin: "0 auto"}}>
                            <CardMedia
                                component="img"
                                image={sigmaLogo}
                                alt="Sigma Team Logo"
                            />
                        </Box>
                        <Box sx={{textAlign: {xs: "center", md: "center"}}}>
                            <Typography variant="h5">Contacts</Typography>
                            <Typography>Bohdan</Typography>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={0.5}
                            >
                                <Email />
                                <Typography>mylyibohdan18@gmail.com</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={0.5}
                            >
                                <Telegram />
                                <Typography>@bohdan_mylyi</Typography>
                            </Stack>
                            <Typography>Ivan</Typography>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={0.5}
                            >
                                <Email />
                                <Typography>ostapivivan@gmail.com</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                justifyContent="center"
                            >
                                <Telegram />
                                <Typography>@IOStapiv</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default About;
