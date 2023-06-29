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
}

const initialState: initialStateProps = {
    list: [],
    loading: false,
};

export const sliceProduct = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProductRequest: (state, action) => {
            state.loading = true;
        },
        getProductSuccess: (state, action) => {
            state.list = action.payload;
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
