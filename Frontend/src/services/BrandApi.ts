import axios from 'axios';

interface BrandData {
    id?: number | string;
    name: string;
}

const baseURL = import.meta.env.VITE_LINK;

const api = axios.create({
    baseURL: baseURL,
});

export async function listBrands(filter: string) {
    const response = await api.get(`brand`, {
        params: {
            filter,
        },
    });
    return response.data;
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
