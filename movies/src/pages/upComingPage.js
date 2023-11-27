import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getUpComingMovies } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchlistIcon from '../components/cardIcons/addToWatchlist'

const UpComingPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('upComing', getUpComingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

  return (
    <PageTemplate
      title="Discover Up Coming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToWatchlistIcon movie={movie} />
      }}
    />
  );
};
export default UpComingPage;