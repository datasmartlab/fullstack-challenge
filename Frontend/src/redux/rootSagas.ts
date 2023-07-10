import { all } from 'redux-saga/effects';
import BrandSaga from './brands/BrandsSaga';
import ProductsSaga from './products/ProductsSaga';
import { SagaIterator } from 'redux-saga';

export default function* rootSaga(): SagaIterator<void> {
    return yield all([BrandSaga, ProductsSaga]);
}
