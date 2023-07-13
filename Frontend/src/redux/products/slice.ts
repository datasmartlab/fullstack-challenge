import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    brandId: number;
    brandData: { id: number; name: string };
}

interface Data {
    list: { data: { data: Product[]; count: number } };
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

interface Pagination {
    count: number;
    offset: number;
    limit: number;
    filter: {
        name: string;
        price: string;
    };
}

interface initialStateProps {
    list: Product[];
    loading: boolean;
    pagination: Pagination;
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
        getProductRequest: (state) => {
            state.loading = true;
        },
        getProductSuccess: {
            reducer: (
                state,
                action: PayloadAction<{
                    data: Data;
                }>,
            ) => {
                const { data } = action.payload;
                state.pagination = data.pagination;
                state.list = data.list.data.data;
                state.loading = false;
            },
            prepare: (data: Data) => {
                return { payload: { data } };
            },
        },
        getProductFailure: (state) => {
            state.loading = false;
        },
    },
});

export const { actions } = sliceProduct;
export default sliceProduct.reducer;
