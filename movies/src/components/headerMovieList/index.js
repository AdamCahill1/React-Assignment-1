import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/themeContext";

const Header = (props) => {
  const title = props.title;
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchedMoviesPage`, {
      state: { searchQuery: encodeURIComponent(searchQuery) },
    });
  };

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 1.5,
        padding: "0 1em",
        backgroundColor: themeMode === "dark" ? "#212121" : "#C0C0C0",
      }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon
          color="primary"
          fontSize="large"
          style={{ color: themeMode === "dark" ? "#FFFFFF" : "#000000" }}
        />
      </IconButton>

      <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center" }}>
        <TextField
          sx={{
            height: "40px",
            "& .MuiFilledInput-root": {
              borderRadius: 15,
              padding: "6px",
              height: "100%",
            },
            "& .MuiInputLabel-root": {
              fontSize: "small",
              marginTop: "-5px",
              marginLeft: "8px",
            },
          }}
          id="filled-search"
          label="Global Search field"
          type="search"
          variant="filled"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <SearchIcon
                style={{
                  marginRight: "8px",
                }}
              />
            ),
          }}
        />
      </form>

      <Typography
        variant="h4"
        component="h3"
        style={{
          color: themeMode === "dark" ? "#FFFFFF" : "#000000",
          flex: "1 1 auto",
          textAlign: "center",
          margin: "auto",
        }}
      >
        {title}
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon
          color="primary"
          fontSize="large"
          style={{ color: themeMode === "dark" ? "#FFFFFF" : "#000000" }}
        />
      </IconButton>
    </Paper>
  );
};

export default Header;
