import ProductActionTypes from "./action-types";

export const addProductToList = (payload) => ({
  type: ProductActionTypes.LIST_PRODUCT,
  payload,
});
