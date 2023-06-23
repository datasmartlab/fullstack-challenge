import axios from 'axios'

interface productData{
    id?:number,
    name:string,
    price:string,
    description:string
}

const baseURL = 'http://localhost:3001/'

const api = axios.create({
    baseURL:baseURL,
})

export async function getAllProducts(){
    const response = await api.get('products');
    return response;
}


export async function addProduct(data:productData){
    const response = await api.post('product',{
            name:data.name,
            price:data.price,
            description:data.description
        });
    return response;
}

export async function deleteProduct(id:number){
    const response = await api.delete('product/'+id)
    return response
}

export async function alterProduct(data:productData) {
    const response = await api.put('product',{
        id:data.id,
        name:data.name,
        price:data.price,
        description:data.description
    });
    return response;
}