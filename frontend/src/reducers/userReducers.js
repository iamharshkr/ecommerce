import {
  CLEAR_ERRORS,
  FAIL_LOGIN,
  REQUEST_LOGIN,
  SUCCESS_LOGIN,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        loading: true,
      };

    case SUCCESS_LOGIN:
      return {
        loading: false,
        user: action.payload,
        is_authenticated: true,
      };

    case FAIL_LOGIN:
      return {
        loading: false,
        error: action.payload,
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
