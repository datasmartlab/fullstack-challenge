import ProductActionTypes from "./action-types";

const initialState = {
  currentProducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.LIST_PRODUCT:
      return {
        ...state,
        currentProducts: [...action.payload],
      };

    default:
      return initialState;
  }
};

export default productReducer;
