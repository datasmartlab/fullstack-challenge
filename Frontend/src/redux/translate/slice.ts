import { createSlice } from '@reduxjs/toolkit';

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
        changeLanguageRequest: (state) => {
            state.loading = true;
        },
        changeLanguageSuccess: (state, action) => {
            state.language = action.payload;
            state.loading = false;
        },
        changeLanguageFailure: (state) => {
            state.loading = false;
        },
    },
});

export const { actions } = sliceLanguage;
export default sliceLanguage.reducer;
