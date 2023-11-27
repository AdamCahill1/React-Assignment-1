import React, { useState } from "react";
import SiteHeader from "../components/siteHeader";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [watchlist, setWatchlist] = useState( [] )

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const addToWatchlist = (movie) => {
    let newWatchlist = [];
    if (!watchlist.includes(movie.id)){
      newWatchlist = [...watchlist, movie.id];
    }
    else{
      newWatchlist = [...watchlist];
    }
    setWatchlist(newWatchlist)
  };





  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };



  const removeFromWatchlist = (movie) => {
    setWatchlist( watchlist.filter(
      (mId) => mId !== movie.id
    ) )
  };


  return (
    <MoviesContext.Provider
      value={{
        favorites,
        watchlist,
        addToFavorites,
        addToWatchlist,
        removeFromFavorites,
        removeFromWatchlist
      }}
    >
      
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;