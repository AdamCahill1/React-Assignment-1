import React, { useContext  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import PlaylistAddedIcon from "@mui/icons-material/PlaylistAddCheck";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { MoviesContext } from "../../contexts/moviesContext";
export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const { watchlist, addToWatchlist } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  if (watchlist.find((id) => id === movie.id)) {
    movie.watchlist = true;
  } else {
    movie.watchlist = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    addToWatchlist(movie);
  };

  return (
    <Card
      sx={{
         maxWidth: 345,
         backgroundColor: '#C0C0C0' // HERE IS THE BACKGROUND COLOR
      }}>
      <CardHeader
        avatar={
          <>
            {movie.favorite && (
              <Avatar sx={{ backgroundColor: 'red'}}>
                <FavoriteIcon />
              </Avatar>
            )}
            {movie.watchlist && (
              <Avatar sx={{ backgroundColor: 'red' }}>
                <PlaylistAddedIcon />
              </Avatar>
            )}
          </>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Typography variant="h7" component="p" sx={{ textAlign: 'center' }}>
              {movie.title}{" "}
            </Typography>
          </Grid>

           <Grid item sm={6}>
            <Typography variant="h7" component="p" sx={{ textAlign: 'left' }}>
              <CalendarIcon fontSize= "1.5rem" />
              {"  "} {movie.release_date} {" "}
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h7" component="p" sx={{ textAlign: 'right' }}>
              <StarRateIcon fontSize="1.5rem" sx={{ padding: '2px', color: 'yellow'}} />
              {"  "} {movie.vote_average} {" "}
            </Typography>
          </Grid>

        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary" >
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}