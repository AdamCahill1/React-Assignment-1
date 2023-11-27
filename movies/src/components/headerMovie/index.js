import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/themeContext";

const MovieHeader = (props) => {
  const movie = props.movie;
  const { themeMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <Paper
        component="div"
        sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 1.5,
            marginBottom: 1.5,
            backgroundColor: themeMode === 'dark' ? '#212121' : '#C0C0C0',
        }}
      >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
        <ArrowBackIcon color="primary" fontSize="large" style={{ color: themeMode === 'dark' ? '#FFFFFF' : '#000000' }}/>
      </IconButton>

      <Typography variant="h4" component="h3" style={{ color: themeMode === 'dark' ? '#FFFFFF' : '#000000' }} sx={{ textAlign: 'center' }}>
        {movie.title}
        <br/>
        <span sx={{ fontSize: "1.5rem" }}>{`   "${movie.tagline}"`} </span>
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
        <ArrowForwardIcon color="primary" fontSize="large" style={{ color: themeMode === 'dark' ? '#FFFFFF' : '#000000' }}/>
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;