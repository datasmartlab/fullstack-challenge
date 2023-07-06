import axios from 'axios';

interface productData {
    id?: number | string;
    name: string;
    price: string;
    description: string;
}

interface paginationData {
    offset: number;
    limit: number;
    filter: {
        name: string;
        price: string;
    };
}

const baseURL = import.meta.env.VITE_LINK;

const api = axios.create({
    baseURL: baseURL,
});

export async function listProducts(pagination: paginationData) {
    let params = {
        offset: pagination.offset,
        limit: pagination.limit,
    };

    if (pagination.filter.name || pagination.filter.price) {
        params = {
            ...params,
            filter: pagination.filter,
        } as typeof params;
    }
    const response = await api.get(`product`, {
        params,
    });

    return response;
}

export async function showProduct(id: number) {
    const response = await api.get(`product/${id}`);
    if (response.status != 200) {
        return response.data.message;
    }
    return response.data;
}

export async function createProduct(data: productData) {
    const response = await api.post(`product`, {
        name: data.name,
        price: data.price.replace(',', '.'),
        description: data.description,
    });
    return response;
}

export async function deleteProduct(id: number | string | undefined) {
    const response = await api.delete(`product/${id}`);
    return response;
}

export async function updateProduct(data: productData) {
    const response = await api.put(`product/${data.id}`, {
        name: data.name,
        price: data.price.replace(',', '.'),
        description: data.description,
    });
    return response;
}
