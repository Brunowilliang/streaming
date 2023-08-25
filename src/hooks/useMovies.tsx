import {
  useInfiniteQuery, useQuery,
} from "@tanstack/react-query";
import { pb } from "@/lib/api";
import { Collections, MoviesRecord, MoviesResponse } from "@/types/types";
import { ListQueryParams, ListResult } from "pocketbase";

type MoviesProps = {
  items: MoviesResponse[];
};

export function useMovies(params?: ListQueryParams) {
  const { filter, page = 1, perPage = 50 } = params || {};

  const queryResult = useInfiniteQuery<MoviesProps, Error>({
    queryKey: ["movies", filter, page, perPage],
    queryFn: ({ pageParam = page }) => getMovies({ filter, page: pageParam, perPage }),
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    refetchOnWindowFocus: false,
  });  

  const {
    data: movies,
    isLoading: moviesLoading,
    isFetching: moviesFetching,
    isRefetching: moviesRefetching,
    ...rest
  } = queryResult;

  return {
    movies,
    moviesLoading,
    moviesFetching,
    moviesRefetching,
    ...rest
  }
}


export function useSearchMovies(params?: ListQueryParams) {
  const { filter, page = 1, perPage = 50 } = params || {};

  const queryResult = useQuery<MoviesResponse[], Error>({
    queryKey: ["search-movies", filter, page, perPage],
    queryFn: () => search({ filter, page, perPage }),
  });

  const {
    data: searchMovies,
    isLoading: searchMoviesLoading,
    isFetching: searchMoviesFetching,
    isRefetching: searchMoviesRefetching,
    ...rest
  } = queryResult;

  return {
    searchMovies,
    searchMoviesLoading,
    searchMoviesFetching,
    searchMoviesRefetching,
    ...rest
  }
}

async function search(params?: ListQueryParams) {
  try {
    const response = await pb.collection(Collections.Movies).getList(params?.page, params?.perPage, {
      filter: params?.filter
    });
    return response.items as any;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getMovies(params?: ListQueryParams) {
  try {
    const response = await pb.collection(Collections.Movies).getList(params?.page, params?.perPage, {
      filter: params?.filter
    });
    return response as any;
  } catch (error) {
    console.log(error);
    return [];
  }
}
  