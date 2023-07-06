import { createAction } from '@reduxjs/toolkit';

export const FETCH_BRANDS_REQUESTED = 'FETCH_BRANDS_REQUESTED';

export const fetchBrandsRequested = createAction(
    FETCH_BRANDS_REQUESTED,
    (offset: number, limit: number, filter = '') => {
        return {
            payload: {
                offset,
                limit,
                filter,
            },
        };
    },
);
