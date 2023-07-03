import axios from 'axios';

interface productData {
    id?: number | string;
    name: string;
    price: string;
    description: string;
}

const baseURL = import.meta.env.VITE_LINK;

const api = axios.create({
    baseURL: baseURL,
});

interface paginationData {
    offset: number;
    limit: number;
    filter: string;
}

export async function listProducts(pagination: paginationData) {
    const response = await api.get(`product`, {
        params: {
            offset: pagination.offset,
            limit: pagination.limit,
            filter: pagination.filter,
        },
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
