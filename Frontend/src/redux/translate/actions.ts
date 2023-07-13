import { createAction } from '@reduxjs/toolkit';

export const CHANGE_LANGUAGE_REQUEST = 'CHANGE_LANGUAGE_REQUEST';

export const changeLanguageRequest = createAction(
    CHANGE_LANGUAGE_REQUEST,
    (language: 'pt' | 'en') => {
        return {
            payload: {
                language,
            },
        };
    },
);
