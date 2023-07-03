import { createAction } from '@reduxjs/toolkit';

export const FETCH_PRODUCTS_REQUESTED = 'FETCH_PRODUCTS_REQUESTED';

export const fetchProductsRequested = createAction(
    FETCH_PRODUCTS_REQUESTED,
    (offset, limit, filter = '') => {
        return {
            payload: {
                offset,
                limit,
                filter,
            },
        };
    },
);
