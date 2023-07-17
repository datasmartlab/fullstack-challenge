import { put, takeLatest, call, all } from 'redux-saga/effects';
import { actions } from './slice';
import { listBrands } from '../../services/brandApi';

interface BrandData {
    id: number;
    name: string;
}
interface FetchProductsAction {
    type: typeof actions.getBrandRequest;
    payload: {
        filter: string;
    };
}

function* fetchBrands({ payload }: FetchProductsAction) {
    const { getBrandFailure, getBrandSuccess } = actions;
    try {
        const brand: BrandData[] = yield call(listBrands, payload.filter);
        yield put(getBrandSuccess(brand));
    } catch (error) {
        yield put(getBrandFailure());
    }
}

export default all([takeLatest('brands/getBrandRequest', fetchBrands)]);
