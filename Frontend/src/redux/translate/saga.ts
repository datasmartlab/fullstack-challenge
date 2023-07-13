import { put, takeLatest, all } from 'redux-saga/effects';
import { CHANGE_LANGUAGE_REQUEST } from './actions';
import { actions } from './slice';

interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE_REQUEST;
    payload: {
        language: 'pt' | 'en';
    };
}

function* changeLanguage({ payload }: ChangeLanguageAction) {
    const {
        changeLanguageFailure,
        changeLanguageSuccess,
        changeLanguageRequest,
    } = actions;
    try {
        yield put(changeLanguageRequest());
        yield put(changeLanguageSuccess(payload.language));
        localStorage.setItem('language', payload.language);
    } catch (error) {
        yield put(changeLanguageFailure());
    }
}

export default all([takeLatest(CHANGE_LANGUAGE_REQUEST, changeLanguage)]);
