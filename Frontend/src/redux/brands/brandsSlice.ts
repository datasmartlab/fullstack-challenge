import { createSlice } from '@reduxjs/toolkit';

interface Brand {
    id: number;
    name: string;
}

interface initialStateProps {
    list: Brand[];
    loading: boolean;
    pagination: {
        count: number;
        offset: number;
        limit: number;
        filter: string;
    };
}

const initialState: initialStateProps = {
    list: [],
    loading: false,
    pagination: {
        offset: 0,
        limit: 5,
        count: 10,
        filter: '',
    },
};

export const sliceBrand = createSlice({
    name: 'brands',
    initialState,
    reducers: {
        getBrandRequest: (state, action) => {
            state.loading = true;
        },
        getBrandSuccess: (state, action) => {
            state.pagination = action.payload.pagination;
            state.pagination.count = action.payload.list.data.count;
            state.list = action.payload.list.data.data;

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
