import { put, takeLatest, call, all } from 'redux-saga/effects';
import { FETCH_PRODUCTS_REQUESTED } from './actions';
import {
    getProductRequest,
    getProductFailure,
    getProductSuccess,
} from './ProductsSlice'; // Importe as actions do slice de produtos

import { listProducts } from '../../services/ProductApi';

interface ProductData {
    data: {
        id: number;
        name: string;
        description: string;
        price: number;
        brandId: number;
        brandDatum: { name: string };
    }[];
    count?: number;
}

interface FetchProductsAction {
    type: typeof FETCH_PRODUCTS_REQUESTED;
    payload: {
        offset: number;
        limit: number;
        filter: {
            name: string;
            price: string;
        };
    };
}

interface Data {
    list: ProductData;
    pagination: {
        offset: number;
        limit: number;
    };
}

function* fetchProducts({ payload }: FetchProductsAction) {
    try {
        yield put(getProductRequest(payload));
        const product: ProductData = yield call(listProducts, payload);
        const Data: Data = {
            list: product,
            pagination: payload,
        };
        yield put(getProductSuccess(Data));
    } catch (error) {
        yield put(getProductFailure(error));
    }
}

export default all([takeLatest(FETCH_PRODUCTS_REQUESTED, fetchProducts)]);
