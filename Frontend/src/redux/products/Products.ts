import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_PRODUCTS_REQUESTED } from './actions';
import { setProduct } from './ProductSlice'; // Importe as actions do slice de produtos

import { listProducts } from '../../services/ProductApi';
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
        yield put(setProduct(product.data)); // Use a action setProduct do slice de produtos
    } catch (e) {
        console.log(e);
    }
}

function* rootSaga() {
    yield takeLatest(FETCH_PRODUCTS_REQUESTED, fetchProducts);
}

export default rootSaga;
