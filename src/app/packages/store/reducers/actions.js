import { status } from '../enum';
import { MOVIES } from '../actions/actions';

const initialState = {
  movies: undefined,
  moviesLoadStatus: status.SHOULD_CALL_API,
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case MOVIES.GET_MOVIES:
      return {
        ...state,
        moviesLoadStatus: status.FETCHING,
      };

    case MOVIES.GET_MOVIES_SUCCESS:
    return {
      ...state,
      movies: payload.payload.response,
      moviesLoadStatus: status.SUCCESS,
    };

    case MOVIES.GET_MOVIES_FAILED:
    return {
      ...state,
      moviesLoadStatus: status.FAIL,
    };

    default:
      return state;
  }
};
