import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Menu,
    Typography,
    IconButton,
    CardMedia,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import sigmaLogoFaviconBlack from '/sigma-team-favicon-black.svg';
import sigmaLogoFaviconWhite from '/sigma-team-favicon-white.svg';
import ColorModeSwitch from './ColorModeSwitch';
import {
    HOME,
    STADIUM_ROUTE,
    MATCH_ROUTE,
    ABOUT,
    STADIUM_SEARCH_ROUTE,
} from '../router/pathConstants';

const Header: React.FC = () => {
    const theme = useTheme();
    const sigmaLogoFavicon =
        theme.palette.mode === 'dark'
            ? sigmaLogoFaviconWhite
            : sigmaLogoFaviconBlack;
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const pages = [
        { label: 'Home', path: HOME },
        { label: 'Stadium', path: STADIUM_ROUTE },
        { label: 'Match', path: MATCH_ROUTE },
        { label: 'Stadium Search', path: STADIUM_SEARCH_ROUTE },
        { label: 'About', path: ABOUT },
    ];

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="absolute" sx={{zIndex: '998'}}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            <IconButton
                                size="large"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon fontSize="large" sx={{ color: theme.palette.custom.darkContrastText,}} />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <IconButton
                                        component={Link}
                                        to={page.path}
                                        key={page.label}
                                        sx={{
                                            my: 2,
                                            color: theme.palette.text.primary,
                                            display: 'block',
                                        }}
                                        onClick={handleCloseNavMenu}
                                    >
                                        {page.label}
                                    </IconButton>
                                ))}
                            </Menu>
                        </Box>
                        <Box component={Link} to={HOME}>
                            <CardMedia
                                sx={{ maxHeight: '50px' }}
                                component="img"
                                image={sigmaLogoFavicon}
                                alt="Sigma Team Logo"
                            />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: theme.palette.custom.darkContrastText,
                            }}
                        >
                            Team Sigma
                        </Typography>
                        <Box
                            ml={10}
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            {pages.map((page) => (
                                <IconButton
                                    component={Link}
                                    to={page.path}
                                    key={page.label}
                                    sx={{
                                        my: 2,
                                        color: theme.palette.custom.darkContrastText,
                                        display: "block",

                                    }}
                                >
                                    {page.label}
                                </IconButton>
                            ))}
                        </Box>
                    </Box>
                    <ColorModeSwitch />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
