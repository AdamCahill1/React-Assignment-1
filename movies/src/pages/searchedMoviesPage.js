import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { searchMovies } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { useLocation } from "react-router-dom";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const SearchedMoviesPage = () => {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery;

  const { data, error, isLoading, isError } = useQuery(["searchMovies", searchQuery], () =>
    searchMovies(searchQuery)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <PageTemplate
      title="Searched Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default SearchedMoviesPage;
