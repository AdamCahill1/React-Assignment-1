import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/PlaylistRemove";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);


  const handleRemoveFromWatchlist = (e) => {
    e.preventDefault();
    context.removeFromWatchlist(movie);
  };
  return (
    <IconButton
      aria-label="remove from watchlist"
      onClick={handleRemoveFromWatchlist}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchlistIcon;