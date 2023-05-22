import {
    CLEAR_ERRORS,
  FAIL_ALL_PRODUCTS,
  REQUEST_ALL_PRODUCTS,
  SUCCESS_ALL_PRODUCTS,
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case REQUEST_ALL_PRODUCTS:
      return {
        ...state,
        loading: true,
      };

    case SUCCESS_ALL_PRODUCTS:
      return {
        loading: false,
        products: action.payload,
      };

    case FAIL_ALL_PRODUCTS:
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
