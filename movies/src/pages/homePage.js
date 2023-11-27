import React from "react";
import PageTemplate from '../components/templateMoviePaginationListPage';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { getMovies } from "../api/tmdb-api";

const HomePage = () => {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
    isLoading,
    isError,
  } = useInfiniteQuery( 'discover', ({ pageParam = 1 }) => getMovies(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data?.pages?.flatMap((page) => page.results) || [];

  const handlePageChange = async (newPage) => {
    if (data?.pages && newPage < data.pages[data.pages.length - 1].page && hasPreviousPage) {
      fetchPreviousPage();
    } else if (data?.pages && newPage > data.pages[data.pages.length - 1].page && hasNextPage) {
      await fetchNextPage();
    }
  };

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
      currentPage={data?.pages?.length > 0 ? data.pages[data.pages.length - 1].page : 0}
      totalPages={data?.pages?.length > 0 ? data.pages[data.pages.length - 1].total_pages : 0}
      onPageChange={handlePageChange}
      hasPreviousPage={hasPreviousPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default HomePage;
