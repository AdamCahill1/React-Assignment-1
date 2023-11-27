import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import HomeIcon from "@mui/icons-material/Home";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { useTheme } from "../../contexts/themeContext";
import { getWatchProviders } from "../../api/tmdb-api";
import { getMovieTrailers } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { themeMode, toggleTheme } = useTheme();
  const { data, error, isLoading, isError } = useQuery(["watchProviders", movie.id], () => getWatchProviders(movie.id));

  const { data: trailersData, error: trailersError, isLoading: trailersIsLoading, isError: trailersIsError } = useQuery(["movieTrailer", movie.id], () => getMovieTrailers(movie.id));

  if (isLoading || trailersIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  else if (trailersIsError){
    return <h1>{trailersError}</h1>;
  }
  const provider = data.IE;
  const officialTrailer = trailersData.find(trailer => trailer.name.includes('Trailer'));

  return (
    <>
      <Typography variant="h5" component="h3" style={{ color: themeMode === 'dark' ? '#FFFFFF' : '#000000' }}>
        Overview
      </Typography>

      <Typography variant="h6" component="p" style={{ color: themeMode === 'dark' ? '#FFFFFF' : '#000000' }}>
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{...root, backgroundColor: themeMode === 'dark' ? '#212121' : '#C0C0C0'}}>
        <li>
          <Chip label="Genres" sx={{...chip, color: "white", backgroundColor: themeMode === 'dark' ? '#C0C0C0' : '#002F7F'}} />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip, color: themeMode === 'dark' ? 'white' : 'black'}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root, backgroundColor: themeMode === 'dark' ? '#212121' : '#C0C0C0'}}>
        <li>
          <Chip label="Production Countries" sx={{...chip, color: "white", backgroundColor: themeMode === 'dark' ? '#C0C0C0' : '#002F7F'}} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip, color: themeMode === 'dark' ? 'white' : 'black'}} />
          </li>
        ))}

      </Paper>

      <Paper component="ul" sx={{ ...root, backgroundColor: themeMode === 'dark' ? '#212121' : '#C0C0C0' }}>
        <li>
          <Chip label="Buy from" sx={{ ...chip, color: "white", backgroundColor: themeMode === 'dark' ? '#C0C0C0' : '#002F7F' }} />
        </li>
        {provider?.buy && Array.isArray(provider.buy) && provider.buy.map((item, index) => (
          <li key={index}>
            <Chip label={item.provider_name} sx={{ ...chip, color: themeMode === 'dark' ? 'white' : 'black' }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root, backgroundColor: themeMode === 'dark' ? '#212121' : '#C0C0C0' }}>
        <li>
          <Chip label="Rent from" sx={{ ...chip, color: "white", backgroundColor: themeMode === 'dark' ? '#C0C0C0' : '#002F7F' }} />
        </li>
        {provider?.rent && Array.isArray(provider.rent) && provider.rent.map((item, index) => (
          <li key={index}>
            <Chip label={item.provider_name} sx={{ ...chip, color: themeMode === 'dark' ? 'white'  : 'black' }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{...root, backgroundColor: themeMode === 'dark' ? '#212121' : '#C0C0C0'}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} sx={{color: themeMode === 'dark' ? 'white' : 'black'}}/>
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
          sx={{color: themeMode === 'dark' ? 'white' : 'black'}}
        />
        <Chip
          icon={<StarRate/>}
          label={`${movie.vote_average} (${movie.vote_count}` }
          sx={{color: themeMode === 'dark' ? 'white' : 'black'}}
        />
        <Chip label={`Released: ${movie.release_date}`} sx={{color: themeMode === 'dark' ? 'white' : 'black'}}/>
      </Paper>


      <Paper component="ul" sx={{...root, backgroundColor: themeMode === 'dark' ? '#212121' : '#C0C0C0'}}>
        <li>
          <Chip label="Movie Web Page" sx={{...chip, color: "white", backgroundColor: themeMode === 'dark' ? '#C0C0C0' : '#002F7F'}} color="primary" />
        </li>
        <a href={movie.homepage}>
          <HomeIcon sx={{color: themeMode === 'dark' ? 'white' : 'black'}}/>
        </a>

      </Paper>


      <Paper component="div" sx={{ ...root, backgroundColor: themeMode === 'dark' ? '#212121' : '#C0C0C0' }}>
        {officialTrailer ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${officialTrailer.key}`}
            title="YouTube video player"
            frameBorder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No official trailer available</p>
        )}
      </Paper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};
export default MovieDetails ;