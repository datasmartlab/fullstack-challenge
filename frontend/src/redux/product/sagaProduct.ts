import { put, takeLatest, call, all } from "redux-saga/effects";
import {
  createProduct,
  deleteProduct,
} from "../../services/ProductAPI";
import { actions } from "./sliceProduct";
import api from '../../services/ProductAPI'

//Nas proximas tdo no saga
function* fetchProducts() {
  //List
  try {
    // const product: ProductDataDTO = yield call(listProduct, payload);
    const {data: {data: productData}}: Data = yield call(api.get, 'product')
    yield put(actions.getProductSuccess(productData));
  } catch (error) {
    //msg de falha
    yield put(actions.getProductFailure());
  }
}

function* fetchShowProduct({ payload }: FetchShowProductsAction) {
  const { id } = payload;
  
  try {
    const {data}: showData = yield call(api.get, `product/${id}`)
    yield put(actions.getShowProductSuccess(data));
  } catch (error) {
    yield put(actions.getShowProductFailure());
    //msg de falha
  }
}

function* fetchUpdateProduct({payload}: FetchUpdateProductsAction) {
  try {
    const {data: {data: productData}}: Data  = yield call(api.put, `product/${payload.id}`, payload )
    yield put(actions.getUpdateProductSuccess(productData));
    window.alert("Produto Atualizado");
  } catch (error) {
    yield put(actions.getUpdateProductFailure());
    window.alert("Erro"); //nao precisa, mensagem especifica
    //msg de falha
  }
}

function* fetchCreateProduct({payload}: FetchCreateProductsAction) {
  //alterar nome da variavel de fetch
  try {
    // const product: ProductData = yield call(createProduct, payload.payload);
    const {data: {data: productData}}: Data  = yield call(api.post, 'product', payload)
    yield put(actions.getCreateProductSuccess(productData));
    window.alert("Produto cadastrado com sucesso");
  } catch (error) {
    yield put(actions.getCreateProductFailure());
    window.alert("Erro");
    //msg de falha
  }
}

function* fetchDeleteProduct({payload}: FetchDeleteProductsAction) {
  const { id } = payload;
  try {
    // yield call(deleteProduct, id);
    yield call(api.delete, `product/${id}`) 
    yield put(actions.getDeleteProductSuccess(id));
    //msg de sucesso
  } catch (error) {
    //msg de falha
    yield put(actions.getDeleteProductFailure());
  }
}

export default all([
  takeLatest("products/getProductRequest", fetchProducts),
  takeLatest("products/getUpdateProductRequest", fetchUpdateProduct),
  takeLatest("products/getShowProductRequest", fetchShowProduct),
  takeLatest("products/getCreateProductRequest", fetchCreateProduct),
  takeLatest("products/getDeleteProductRequest", fetchDeleteProduct),
]);
