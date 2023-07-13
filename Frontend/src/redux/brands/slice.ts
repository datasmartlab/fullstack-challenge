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
        getBrandRequest: (state) => {
            state.loading = true;
        },
        getBrandSuccess: (state, action) => {
            state.list = action.payload.data;

            state.loading = false;
        },
        getBrandFailure: (state) => {
            state.loading = false;
        },
    },
});

export const { actions } = sliceBrand;

export default sliceBrand.reducer;
