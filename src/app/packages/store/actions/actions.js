export const MOVIES = {
  GET_MOVIES: 'GET_MOVIES',
  GET_MOVIES_SUCCESS: 'GET_MOVIES_SUCCESS',
  GET_MOVIES_FAILED: 'GET_MOVIES_FAILED',
};

export const getMovies = payload => ({
  type: MOVIES.GET_MOVIES,
  payload,
});

export const getMoviesSuccess = payload => ({
  type: MOVIES.GET_MOVIES_SUCCESS,
  payload,
});

export const getMoviesFailed = payload => ({
  type: MOVIES.GET_MOVIES_FAILED,
  payload,
});
