import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";


const WatchlistPage = () => {
  const {watchlist: movieIds } = useContext(MoviesContext);

  const watchlistQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["watchlist movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = watchlistQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = watchlistQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Watch List"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchlist movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchlistPage;