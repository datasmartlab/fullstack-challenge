import axios from 'axios';

interface BrandData {
    id?: number | string;
    name: string;
}

interface paginationData {
    offset: number;
    limit: number;
    filter: string;
}

const baseURL = import.meta.env.VITE_LINK;

const api = axios.create({
    baseURL: baseURL,
});

export async function listBrands(pagination: paginationData) {
    let params = {
        offset: pagination.offset,
        limit: pagination.limit,
    };
    if (pagination.filter) {
        params = {
            ...params,
            filter: pagination.filter,
        } as typeof params;
    }
    const response = await api.get(`brand`, {
        params,
    });
    return response;
}
export async function showBrand(id: number) {
    const response = await api.get(`brand/${id}`);
    if (response.status != 200) {
        return response.data.message;
    }
    return response.data;
}

export async function createBrand(data: BrandData) {
    const response = await api.post(`brand`, {
        name: data.name,
    });
    return response;
}

export async function deleteBrand(id: number | string | undefined) {
    const response = await api.delete(`brand/${id}`);
    return response;
}

export async function updateBrand(data: BrandData) {
    const response = await api.put(`brand/${data.id}`, {
        name: data.name,
    });
    return response;
}
