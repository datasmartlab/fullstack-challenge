import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_PRODUCTS_REQUESTED } from './actions';
import {
    getProductRequest,
    getProductFailure,
    getProductSuccess,
} from './ProductsSlice'; // Importe as actions do slice de produtos

import { listProducts } from '../../services/ProductApi';
import axios from 'axios';
interface ProductData {
    data: {
        id: number;
        name: string;
        description: string;
        price: number;
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
        if (axios.isAxiosError(error)) {
            if (error.response) {
                yield put(getProductFailure(error.response.data.message));
            }
        }
    }
}

function* rootSaga() {
    yield takeLatest(FETCH_PRODUCTS_REQUESTED, fetchProducts);
}

export default rootSaga;
