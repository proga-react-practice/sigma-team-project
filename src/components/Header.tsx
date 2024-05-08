import {
    AppBar,
    Box,
    Toolbar,
    Menu,
    Typography,
    IconButton,
    CardMedia,
} from "@mui/material";
import React from "react";
import ProgressBar from "./Match/ProgressBar";
import {Link} from "react-router-dom";
import sigmaLogoFavicon from "/sigma-team-favicon-black.png";
import {HOME, STADIUM_ROUTE, MATCH_ROUTE} from "../router/pathConstants";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const pages = [
        {label: "Home", path: HOME},
        {label: "Stadium", path: STADIUM_ROUTE},
        {label: "Match", path: MATCH_ROUTE},
    ];

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <ProgressBar />
                <Toolbar
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {xs: "flex", md: "none"},
                            }}
                        >
                            <IconButton
                                size="large"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon fontSize="large" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: "block", md: "none"},
                                }}
                            >
                                {pages.map((page) => (
                                    <IconButton
                                        component={Link}
                                        to={page.path}
                                        key={page.label}
                                        sx={{
                                            my: 2,
                                            color: "black",
                                            display: "block",
                                        }}
                                    >
                                        {page.label}
                                    </IconButton>
                                ))}
                            </Menu>
                        </Box>
                        <Box component={Link} to={HOME}>
                            <CardMedia
                                sx={{maxHeight: "50px"}}
                                component="img"
                                image={sigmaLogoFavicon}
                                alt="Sigma Team Logo"
                            />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            Team Sigma
                        </Typography>
                        <Box
                            ml={10}
                            sx={{
                                display: {xs: "none", md: "flex"},
                            }}
                        >
                            {pages.map((page) => (
                                <IconButton
                                    component={Link}
                                    to={page.path}
                                    key={page.label}
                                    sx={{
                                        my: 2,
                                        color: "black",
                                        display: "block",
                                    }}
                                >
                                    {page.label}
                                </IconButton>
                            ))}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
