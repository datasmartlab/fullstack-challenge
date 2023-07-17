import { all } from 'redux-saga/effects';
import brandSaga from './brands/saga';
import productSaga from './products/saga';
import translateSaga from './translate/saga';
import { SagaIterator } from 'redux-saga';

export default function* rootSaga(): SagaIterator<void> {
    return yield all([brandSaga, productSaga, translateSaga]);
}
