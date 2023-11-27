import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getNowPlaying } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlist'

const NowPlayingPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('nowPlaying', getNowPlaying)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

  return (
    <PageTemplate
      title="Discover Movies Currently on Screen"
      movies={movies}
      action={(movie) => {
        return <AddToWatchlistIcon movie={movie} />
      }}
    />
  );
};
export default NowPlayingPage;