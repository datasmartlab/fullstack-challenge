import axios from "axios";

const baseURL = import.meta.env.VITE_LINK;
const api = axios.create({
  baseURL: baseURL,
});

export default api;

// export async function listProduct() {
//   const response = await api.get(`product`);
//   return response;
// }

// export async function updateProduct(product: ProductDataDTO) {
//   const response = await api.put(`product/${product.id}`, product);
//   return response;
// }

// export async function createProduct(product: ProductDataDTO) {
//   const response = await api.post(`product`, product);
//   return response;
// }

// export async function deleteProduct(id: number) {
//   const response = await api.delete(`product/${id}`);
//   return response;
// }

// export async function showProduct(id: number) {
//   const response = await api.get(`product/${id}`);
//   if (response.status != 200) {
//     return response.data.message;
//   }
//   return response.data;
// }


// 100, indica que a solicitação foi recebida.
// 200, indica sucesso da solicitação.
// 301, indica que uma página foi movida para outro endereço.
// 302, indica que uma página foi movida temporariamente.
// 400, indica que a solicitação está incorreta.
// 403, indica que o acesso é proibido.
// 404, indica que a página não foi encontrada.
// 410, indica que o recurso não está mais disponível.
// 500, indica um erro interno do servidor.
