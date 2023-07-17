import { combineReducers } from '@reduxjs/toolkit';

import reducerProduct from './products/slice';
import reducerBrand from './brands/slice';
import reducerTranslate from './translate/slice';

const rootReducer = combineReducers({
    products: reducerProduct,
    brands: reducerBrand,
    traslate: reducerTranslate,
});

export default rootReducer;
