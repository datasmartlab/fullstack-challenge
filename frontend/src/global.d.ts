interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  brandID?: number;
  brandData?: { id: number; name: string };
}

// interface ProductData {
//   data: {
//     data: Product;
//     count: number;
//   };
// }

interface ProductDataDTO {
  id?: number | string;
  name: string;
  price: number | string;
  description: string;
  brandId?: number | string | null;
}

interface Pagination {
  count: number;
  offset: number;
  limit: number;
  filter: {
    name: string;
    price: string;
  };
}

interface PaginationDataDTO {
  offset: number;
  limit: number;
  filter: {
    name: string;
    price: string;
  };
}

interface Data {
  // list: ProductData[];
   data: { data: ProductDataDTO[] | ProductDataDTO };
}

interface showData {
  data: ProductDataDTO[];
}

interface initialStateProps {
  [x: string]: { product: Product };
  //state: { product: Product[] };
  list: ProductDataDTO[];
  loading: boolean;
  pagination: Pagination;
  productInfo: ProductDataDTO;
}

interface FetchProductsAction {
  type: typeof actions.getProductRequest;
  payload: {
    offset: number;
    limit: number;
    filter: {
      name: string | "";
      price: string | "";
    };
  };
}

interface FetchUpdateProductsAction {
  type: typeof actions.getUpdateProductRequest;
  payload: payload;
}

interface FetchShowProductsAction {
  type: typeof actions.getShowProductRequest;
  payload: payload;
}

interface FetchCreateProductsAction {
  type: typeof actions.getCreateProductRequest;
  payload: payload;
}

interface FetchDeleteProductsAction {
  type: typeof actions.getCreateProductRequest;
  payload: payload;
}

interface payload {
  id: number;
  name: string;
  price: string; // Alterado para string para ser consistente com o tipo em ProductDataDTO
  description: string;
  brandId?: number | null;
}

interface CenterPageProps {
  children: ReactNode;
}

interface RowProps {
  id: number | string;
  name: string;
  description: string;
  price: number;
}
