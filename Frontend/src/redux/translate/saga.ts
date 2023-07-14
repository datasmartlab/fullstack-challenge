import { put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';

interface ChangeLanguageAction {
    type: typeof actions.changeLanguageRequest.type;
    payload: {
        language: 'pt' | 'en';
    };
}

function* changeLanguage({ payload }: ChangeLanguageAction) {
    const { changeLanguageFailure, changeLanguageSuccess } = actions;
    try {
        yield put(changeLanguageSuccess(payload.language));
        localStorage.setItem('language', payload.language);
    } catch (error) {
        yield put(changeLanguageFailure());
    }
}

export default all([takeLatest(actions.changeLanguageRequest, changeLanguage)]);
