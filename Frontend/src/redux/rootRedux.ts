import { combineReducers } from '@reduxjs/toolkit';

import reducerProduct from './products/ProductsSlice';
import reducerBrand from './brands/BrandsSlice';

const rootReducer = combineReducers({
    products: reducerProduct,
    brands: reducerBrand,
});
export default rootReducer;
