import { status } from '../enum';
import { ACCOUNTS } from '../actions/actions';

const initialState = {
  info: undefined,
  infoLoadStatus: status.SHOULD_CALL_API,
};

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case ACCOUNTS.SET_INFO:
      return {
        ...state,
        info: payload.payload,
      };

    default:
      return state;
  }
};
