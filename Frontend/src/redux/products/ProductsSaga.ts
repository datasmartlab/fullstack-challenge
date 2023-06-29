import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_PRODUCTS_REQUESTED } from './actions';
import {
    getProductRequest,
    getProductFailure,
    getProductSuccess,
} from './ProductsSlice'; // Importe as actions do slice de produtos

import { listProducts } from '../../services/ProductApi';
import axios from 'axios';
interface productData {
    data: {
        id: number;
        name: string;
        description: string;
        price: number;
    };
}
function* fetchProducts() {
    try {
        const product: productData = yield call(listProducts);
        yield put(getProductRequest(product.data));
        yield put(getProductSuccess(product.data));
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
