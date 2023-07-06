import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_BRANDS_REQUESTED } from './actions';
import {
    getBrandRequest,
    getBrandFailure,
    getBrandSuccess,
} from './brandsSlice';
import { listBrands } from '../../services/BrandApi';

interface BrandData {
    data: {
        id: number;
        name: string;
    }[];
    count?: number;
}

interface FetchBrandsAction {
    type: typeof FETCH_BRANDS_REQUESTED;
    payload: {
        offset: number;
        limit: number;
        filter: string;
    };
}

interface Data {
    list: BrandData;
    pagination: {
        offset: number;
        limit: number;
    };
}

function* fetchBrands({ payload }: FetchBrandsAction) {
    try {
        yield put(getBrandRequest({ payload }));
        const brand: BrandData = yield call(listBrands, payload);
        const data: Data = {
            list: brand,
            pagination: payload,
        };
        yield put(getBrandSuccess(data));
    } catch (error) {
        yield put(getBrandFailure(error));
    }
}

function* rootSaga() {
    yield takeLatest(FETCH_BRANDS_REQUESTED, fetchBrands);
}

export default rootSaga;
