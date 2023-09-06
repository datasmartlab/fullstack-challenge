import { all } from "redux-saga/effects";
import sagaProduct from "./product/sagaProduct";
import { SagaIterator } from "redux-saga"

export default function* rootSagas(): SagaIterator<void>{
    return yield all([sagaProduct])
}