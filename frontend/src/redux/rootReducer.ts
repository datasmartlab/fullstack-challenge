import { combineReducers } from '@reduxjs/toolkit';

import reducerProduct from './product/sliceProduct';

const rootReducer = combineReducers({
    products: reducerProduct
});

export default rootReducer;