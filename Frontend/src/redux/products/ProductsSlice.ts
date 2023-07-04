import { createSlice } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}
interface initialStateProps {
    list: Product[];
    loading: boolean;
    pagination: {
        count: number;
        offset: number;
        limit: number;
        filter: {
            name: string;
            price: string;
        };
    };
}

const initialState: initialStateProps = {
    list: [],
    loading: false,
    pagination: {
        offset: 0,
        limit: 5,
        count: 10,
        filter: { name: '', price: '' },
    },
};

export const sliceProduct = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProductRequest: (state, action) => {
            state.loading = true;
        },
        getProductSuccess: (state, action) => {
            state.pagination = action.payload.pagination;
            state.pagination.count = action.payload.list.data.count;
            state.list = action.payload.list.data.data;

            state.loading = false;
        },
        getProductFailure: (state, action) => {
            state.loading = false;
        },
    },
});

export const { getProductRequest, getProductSuccess, getProductFailure } =
    sliceProduct.actions;
export default sliceProduct.reducer;
