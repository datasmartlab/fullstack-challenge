import { createSlice } from '@reduxjs/toolkit';

interface Brand {
    id: number;
    name: string;
}

interface initialStateProps {
    list: Brand[];
    loading: boolean;
    filter: string;
}

const initialState: initialStateProps = {
    list: [],
    loading: false,
    filter: '',
};

export const sliceBrand = createSlice({
    name: 'brands',
    initialState,
    reducers: {
        getBrandRequest: (state, action) => {
            state.loading = true;
        },
        getBrandSuccess: (state, action) => {
            state.list = action.payload.data;

            state.loading = false;
        },
        getBrandFailure: (state, action) => {
            state.loading = false;
        },
    },
});

export const { getBrandRequest, getBrandSuccess, getBrandFailure } =
    sliceBrand.actions;

export default sliceBrand.reducer;
