import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        getBrandRequest: {
            reducer: (state) => {
                state.loading = true;
            },
            prepare: (filter?: string) => {
                return { payload: { filter } };
            },
        },
        getBrandSuccess: {
            reducer: (state, action: PayloadAction<{ brand: Brand[] }>) => {
                state.list = action.payload.brand;
                state.loading = false;
            },
            prepare: (brand: Brand[]) => {
                return {
                    payload: {
                        brand,
                    },
                };
            },
        },
        getBrandFailure: (state) => {
            state.loading = false;
        },
    },
});

export const { actions } = sliceBrand;

export default sliceBrand.reducer;
