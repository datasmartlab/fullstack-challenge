import { put, takeLatest, call, all } from 'redux-saga/effects';
import { FETCH_PRODUCTS_REQUESTED } from './actions';
import { listProducts } from '../../services/ProductApi';
import { actions } from './slice';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    brandId: number;
    brandData: { id: number; name: string };
}

interface ProductData {
    data: {
        data: Product[];
        count: number;
    };
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
        count: number;
        offset: number;
        limit: number;
        filter: {
            name: string;
            price: string;
        };
    };
}

function* fetchProducts({ payload }: FetchProductsAction) {
    try {
        const product: ProductData = yield call(listProducts, payload);
        const pagination = { ...payload, count: product.data.count };
        const Data: Data = {
            list: product,
            pagination,
        };
        yield put(actions.getProductSuccess(Data));
    } catch (error) {
        yield put(actions.getProductFailure());
    }
}

export default all([takeLatest(FETCH_PRODUCTS_REQUESTED, fetchProducts)]);
