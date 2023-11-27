import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const TemplateMoviePage = ({ movie, children }) => {
  const { data , error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Filter for Languages images
        // English: en
        // French: fr
        // German: de
        // Spanish: es
        // Italian: it
        // Dutch: nl
        // Russian: ru
        // Chinese: zh
        // Japanese: ja
        // Korean: ko
        // Arabic: ar

  const englishImages = data.posters.filter(image => image.iso_639_1 === 'en');
  const images = englishImages

  return (
    <>
      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={12}>
          <MovieHeader movie={movie} />
        </Grid>

        <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList
                cols={1}>
                {images.map((image) => (
                    <ImageListItem key={image.file_path} cols={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={image.poster_path}
                    />
                    </ImageListItem>
                ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;