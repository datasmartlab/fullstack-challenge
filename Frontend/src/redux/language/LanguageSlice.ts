import { createSlice } from '@reduxjs/toolkit';

interface initialStateProps {
    language: string;
}

const initialState: initialStateProps = {
    language: 'pt',
};

export const sliceLanguage = createSlice({
    name: 'products',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            console.log(state.language);
            state.language = action.payload;
        },
    },
});

export const { changeLanguage } = sliceLanguage.actions;
export default sliceLanguage.reducer;
