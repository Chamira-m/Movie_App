export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movies: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();

  return data.results;
};

export const fetchMovieDestails = async (
  movieId: string
): Promise<MovieDetails | null> => {
  try {
    const res = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      { method: "GET", headers: TMDB_CONFIG.headers }
    );

    if (!res.ok) throw new Error("Faild to fetch Movies details");
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
