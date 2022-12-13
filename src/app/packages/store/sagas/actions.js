import { takeEvery, all, put } from 'redux-saga/effects';
import { Urls, API, STATUS } from 'app/packages/utils';
import { MOVIES, getMoviesFailed, getMoviesSuccess } from '../actions/actions';

function* getMovies(payload) {
  const api = new API();
  const Headers = [
    {
      key: 'trakt-api-key',
      value: 'b6ab67a5ef6dce15759eb426151e0fb84e81572ff1f55c2909f2ced677099bc5',
    },
    {
      key: 'trakt-api-version',
      value: 2,
    },
  ];
  const response = yield api.get(`${Urls.getMovies}?query=${payload.payload.query}&page=1&limit=100`, Headers);

  if (STATUS.isSuccess(response.status)) {
    yield put( 
      getMoviesSuccess({
        ...response
      })
    );
  } else {
    yield put( 
      getMoviesFailed({
        ...response
      })
    );
  }
}

export default function* actionsSaga() {
  yield all([
    takeEvery(MOVIES.GET_MOVIES, getMovies),
  ]);
}
