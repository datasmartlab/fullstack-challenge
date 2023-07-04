import { put, takeLatest } from 'redux-saga/effects';
import { CHANGE_LANGUAGE_REQUESTED } from './actions';
import { changeLanguage } from './LanguageSlice'; // Importe as actions do slice de produtos

interface LanguageRequested {
    type: typeof CHANGE_LANGUAGE_REQUESTED;
    payload: {
        language: string;
    };
}

function* ChangeLanguage({ payload }: LanguageRequested) {
    try {
        yield put(changeLanguage(payload));
    } catch (error) {
        console.log(error);
    }
}

function* rootSaga() {
    yield takeLatest(CHANGE_LANGUAGE_REQUESTED, ChangeLanguage);
}

export default rootSaga;
