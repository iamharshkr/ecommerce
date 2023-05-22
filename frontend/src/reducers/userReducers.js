import {
  CLEAR_ERRORS,
  FAIL_LOGIN,
  FAIL_LOGOUT,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  SUCCESS_LOGIN,
  SUCCESS_LOGOUT,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
    case REQUEST_LOGOUT:
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

    case SUCCESS_LOGOUT:
      return {
        loading: false,
        user: {},
        is_authenticated: false,
      };

    case FAIL_LOGIN:
    case FAIL_LOGOUT:
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
