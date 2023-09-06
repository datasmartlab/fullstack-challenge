import { createSlice } from "@reduxjs/toolkit";
import { reducerProduct } from "./reducerProduct";

const initialState: initialStateProps = {
  list: [],
  loading: false,
  pagination: {
    offset: 0,
    limit: 5,
    count: 10,
    filter: { name: "name", price: "" },
  },
  productInfo: {
    id: 0,
    name: "",
    description: "",
    price: 0,
  },
};

const sliceProduct = createSlice({
  name: "products",
  initialState,
  reducers: reducerProduct,
});

export const { actions } = sliceProduct;
export default sliceProduct.reducer;
