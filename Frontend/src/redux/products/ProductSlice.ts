// productsSlice.ts
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
            state.list = action.payload;
        },
        getProductSuccess: (state, action) => {
            state.lsit=
        },
    },
});

export const { setProduct } = sliceProduct.actions;
export default sliceProduct.reducer;
