import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      // putting token into local storage
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload, // the token
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        err: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
