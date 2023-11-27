import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Pagination from "../pagination"; 
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action, currentPage, totalPages, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  const pageSize = 20;  // Adjust the page size as needed
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  let displayedMovies = movies
    .filter((m) => {
      return m.title && m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .slice(startIndex, endIndex);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies} />
      </Grid>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </Grid>
  );
}

export default MovieListPageTemplate;
