import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const savedLanguage = localStorage.getItem('language');

const language =
    savedLanguage === 'pt' || savedLanguage === 'en' ? savedLanguage : 'pt';

interface initialStateProps {
    language: 'pt' | 'en';
    loading: boolean;
}

const initialState: initialStateProps = {
    language: language,
    loading: false,
};

export const sliceLanguage = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguageRequest: {
            reducer: (state) => {
                state.loading = true;
            },
            prepare: (language: 'pt' | 'en') => {
                return {
                    payload: {
                        language,
                    },
                };
            },
        },
        changeLanguageSuccess: {
            reducer: (
                state,
                action: PayloadAction<{
                    language: 'pt' | 'en';
                }>,
            ) => {
                const { language } = action.payload;
                state.language = language;
                state.loading = false;
            },
            prepare: (language: 'pt' | 'en') => {
                return {
                    payload: {
                        language,
                    },
                };
            },
        },
        changeLanguageFailure: (state) => {
            state.loading = false;
        },
    },
});

export const { actions } = sliceLanguage;
export default sliceLanguage.reducer;
