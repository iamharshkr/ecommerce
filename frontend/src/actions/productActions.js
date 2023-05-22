import { getCookie } from "../Components/utils/cookie";
import {
  FAIL_ALL_PRODUCTS,
  REQUEST_ALL_PRODUCTS,
  SUCCESS_ALL_PRODUCTS,
} from "../constants/productConstants";
import axios from "axios";

export const getAllProducts = () => async (dispatch) => {
  try {
    const headers = getCookie()
    dispatch({ type: REQUEST_ALL_PRODUCTS });
    const { data } = await axios.get("/api/products/", { headers });
    dispatch({
      type: SUCCESS_ALL_PRODUCTS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_ALL_PRODUCTS,
      payload: error.response.data.error,
    });
  }
};
