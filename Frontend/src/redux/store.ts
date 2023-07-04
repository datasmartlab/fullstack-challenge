import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './products/ProductsSaga';
import reducerProduct from './products/ProductsSlice';
import reducerLanguage from './language/LanguageSlice';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        products: reducerProduct,
        language: reducerLanguage,
    },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
