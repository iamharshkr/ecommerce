import axios from "axios";
import {
    CLEAR_ERRORS,
  FAIL_LOGIN,
  REQUEST_LOGIN,
  SUCCESS_LOGIN,
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

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
