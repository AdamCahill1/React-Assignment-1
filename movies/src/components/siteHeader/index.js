import React, { useState, useContext, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, Badge } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import WatchlistIcon from "@mui/icons-material/BookmarkAddOutlined";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { MoviesContext } from "../../contexts/moviesContext";
import { useTheme as useCustomTheme } from "../../contexts/themeContext";
import Slider from '@mui/material/Slider';
import { signInWithGooglePopup, auth  } from "../../firebase";
import SignIn, {logGoogleUser} from '../signIn/signIn';
import SignOut from '../signOut/signOut';


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { watchlist } = useContext(MoviesContext);
  const { themeMode, toggleTheme } = useCustomTheme();
  const [user, setUser] = useState(null);

  const isDarkMode = themeMode === 'dark';
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Up Coming", path: "/upComingPage" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "In Cinema", path: "/nowPlayingPage" },
    { label: "Top Rated", path: "/topRatedPage" },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  }

  const handleMenuSelect = (pageURL) => {
    if (pageURL === "/movies/watchlist" && !user) {
      logGoogleUser()
    } else {
      navigate(pageURL, { replace: true });
    }
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSliderChange = (_, newValue) => {
    const newMode = newValue === 0 ? 'light' : 'dark';
    if (newMode !== (isDarkMode ? 'dark' : 'light')) {
      toggleTheme();
    }
  };

  return (
    <>
      <AppBar position="fixed" color={isDarkMode ? 'primary' : 'primary'}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }} style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
            TMDB Client
          </Typography>

          <div>
            {user ? <SignOut /> : <SignIn />}
          </div>

          <Typography variant="h6" sx={{ flexGrow: 1 }} style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              <Slider
                value={isDarkMode ? 1 : 0}
                onChange={handleSliderChange}
                valueLabelDisplay="off"
                step={0.00}
                marks={[
                  {
                    value: 0,
                    label: (
                      <span
                        role="img"
                        aria-label="light-mode-emoji"
                        style={{
                          fontSize: '0.8rem',
                          display: 'block',
                          transform: 'translateY(-95%) translateX(25%)',
                        }}
                      >
                        ☀️
                      </span>
                    ),
                  },
                  {
                    value: 1,
                    label: (
                      <span
                        role="img"
                        aria-label="dark-mode-emoji"
                        style={{
                          fontSize: '0.8rem',
                          display: 'block',
                          transform: 'translateY(-95%) translateX(-15%)',
                        }}
                      >
                        🌙
                      </span>
                    ),
                  },
                ]}
                min={-0.11}
                max={1.2}
                aria-label="light-dark-slider"
                sx={{
                  width: 45,
                  height: 19,
                  margin: '0 10px',
                  color: isDarkMode ? '#FFFFFF' : '#FFFFFF',
                  '& .MuiSlider-valueLabel': {
                    display: 'none',
                  },
                }}
              />
              <IconButton>
                <Badge
                  badgeContent={watchlist.length}
                  color="primary"
                  title="Watchlist"
                  onClick={() => handleMenuSelect("/movies/watchlist")}
                >
                  <WatchlistIcon style={{ color: "white" }} />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
