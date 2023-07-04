import { createAction } from '@reduxjs/toolkit';

export const CHANGE_LANGUAGE_REQUESTED = 'CHANGE_LANGUAGE_REQUESTED';

export const ChangeLanguageRequested = createAction(
    CHANGE_LANGUAGE_REQUESTED,
    (language = 'pt') => {
        return {
            payload: {
                language,
            },
        };
    },
);
