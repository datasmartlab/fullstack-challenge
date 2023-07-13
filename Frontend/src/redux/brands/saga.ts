import { put, takeLatest, call, all } from 'redux-saga/effects';
import { FETCH_BRANDS_REQUESTED } from './actions';
import { actions } from './slice';
import { listBrands } from '../../services/BrandApi';

interface BrandData {
    data: {
        id: number;
        name: string;
    }[];
    count?: number;
}
interface FetchProductsAction {
    type: typeof FETCH_BRANDS_REQUESTED;
    payload: {
        filter: string;
    };
}

function* fetchBrands({ payload }: FetchProductsAction) {
    try {
        const brand: BrandData = yield call(listBrands, payload.filter);
        yield put(actions.getBrandSuccess(brand));
    } catch (error) {
        yield put(actions.getBrandFailure());
    }
}

export default all([takeLatest(FETCH_BRANDS_REQUESTED, fetchBrands)]);
