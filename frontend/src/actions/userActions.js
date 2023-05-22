import axios from "axios";
import {
  CLEAR_ERRORS,
  FAIL_LOGIN,
  FAIL_LOGOUT,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  SUCCESS_LOGIN,
  SUCCESS_LOGOUT,
} from "../constants/userConstants";

export const userLogin = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOGIN });
    const headers = { Accept: "application/json" };

    const { data } = await axios.post("/api/login/", userData, { headers });

    dispatch({
      type: SUCCESS_LOGIN,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: FAIL_LOGIN,
      payload: error.response.data.error,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOGOUT });
    const { data } = await axios.post("/api/logout/");
    dispatch({
      type: SUCCESS_LOGOUT,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_LOGOUT,
      payload: error.response.data.error,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
