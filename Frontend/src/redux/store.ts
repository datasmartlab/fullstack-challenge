import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSagaProduct from './products/ProductsSaga';
import reducerProduct from './products/ProductsSlice';
import reducerBrand from './brands/BrandsSlice';
import rootSagaBrand from './brands/BrandsSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    products: reducerProduct,
    brands: reducerBrand,
});

const store = configureStore({
    reducer: rootReducer,

    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSagaProduct);
sagaMiddleware.run(rootSagaBrand);

export type RootState = ReturnType<typeof store.getState>;

export default store;
