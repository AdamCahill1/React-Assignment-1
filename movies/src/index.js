import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import UpComingPage from "./pages/upComingPage";
import TopRatedPage from "./pages/topRatedPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import WatchlistPage from "./pages/watchlistPage";
import MovieReviewPage from "./pages/movieReviewPage";
import NowPlayingPage from "./pages/nowPlayingPage";
import SiteHeader from './components/siteHeader';
import SearchedMoviesPage from './pages/searchedMoviesPage';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import { ThemeProvider, useTheme } from "./contexts/themeContext";
import { Global, css } from '@emotion/react';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const AppWrapper = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

const App = () => {
  const { themeMode, toggleTheme } = useTheme();
  


  return (
    <>
      <Global
        styles={{
          body: {
            backgroundColor: themeMode === 'dark' ? '#000000' : '#B8AFBF',
            margin: 0,
          },
        }}
      />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MoviesContextProvider>
            <SiteHeader />
            <Routes>
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/watchlist" element={<WatchlistPage />} />
              <Route path="/upComingPage" element={<UpComingPage />} />
              <Route path="/searchedMoviesPage" element={<SearchedMoviesPage />} />
              <Route path="/topRatedPage" element={<TopRatedPage />} />
              <Route path="/nowPlayingPage" element={<NowPlayingPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<AppWrapper />);
