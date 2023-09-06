import { PayloadAction } from "@reduxjs/toolkit";

const reducerListProduct = {
  getProductRequest: (state:initialStateProps) => {
    state.loading = true;
  },
  
  getProductSuccess: {
    reducer: (
      state: initialStateProps,
      action: PayloadAction<{
        data: ProductDataDTO[];
      }>
    ) => {
      const { data } = action.payload;
      state.list = data;
      state.loading = false;
    },
    prepare: (data: ProductDataDTO[]) => {
      return { payload: { data } };
    },
  },

  getProductFailure: (state: initialStateProps) => {
    state.loading = false;
  },
};

const reducerUpdateProduct = {
  getUpdateProductRequest: {
    reducer: (state: initialStateProps) => {
      state.loading = true;
    },
    prepare: (product: ProductDataDTO) => {
      return {
        payload: product,
      };
    },
  },

  getUpdateProductSuccess: {
    reducer: (
      state: initialStateProps,
      action: PayloadAction<{
        product: ProductDataDTO;
      }>
    ) => {
      const { product } = action.payload;
      state.list = state.list.map((item) =>
        item.id === product.id ? product : item
      );
      console.log(product);

      // Atualiza outras propriedades
      state.productInfo = product;
      state.loading = false;
    },
    prepare: (product: ProductDataDTO) => {
      return {
        payload: { product },
      };
    },
  },

  getUpdateProductFailure: (state: initialStateProps) => {
    state.loading = false;
  },
};

const reducerCreateProduct = {
  getCreateProductRequest: {
    reducer: (state: initialStateProps) => {
      state.loading = true;
    },
    prepare: (product: ProductDataDTO) => {
      return {
        payload: product ,
      };
    },
  },

  getCreateProductSuccess: {
    reducer: (
      state: initialStateProps,
      action: PayloadAction<ProductDataDTO>
    ) => {
      const product  = action.payload;
      state.productInfo = product;
      state.loading = false;
    },
    prepare: (product: ProductDataDTO) => {
      return {
        payload: { product },
      };
    },
  },

  getCreateProductFailure: (state: initialStateProps) => {
    state.loading = false;
  },
};

const reducerDeleteProduct = {
  getDeleteProductRequest: {
    reducer: (state: initialStateProps) => {
      state.loading = true;
    },
    prepare: (id: number) => {
      return {
        payload: { id },
      };
    },
  },

  getDeleteProductSuccess: {
    reducer: (
      state: initialStateProps,
      action: PayloadAction<ProductDataDTO>
    ) => {
      const { id } = action.payload;
      state.list = state.list.filter((productInfo) => productInfo.id !== id);
      state.loading = false;
    },
    prepare: (id: number) => {
      return {
        payload: {id} ,
      };
    },
  },

  getDeleteProductFailure: (state: initialStateProps) => {
    state.loading = false;
  },
};

const reducerShowProduct = {
  getShowProductRequest: {
    reducer: (state: initialStateProps) => {
      state.loading = true;
    },
    prepare: (id: string) => {
      return {
        payload: { id },
      };
    },
  },

  getShowProductSuccess: {
    reducer: (
      state: initialStateProps,
      action: PayloadAction<{ productInfo: ProductDataDTO }>
    ) => {
      const { productInfo } = action.payload;
      state.productInfo = productInfo;
      state.loading = false;
    },
    prepare: (productInfo: ProductDataDTO) => {
      return {
        payload: { productInfo },
      };
    },
  },

  getShowProductFailure: (state: initialStateProps) => {
    state.loading = false;
  },
};

export const reducerProduct = {
  ...reducerListProduct,
  ...reducerUpdateProduct,
  ...reducerDeleteProduct,
  ...reducerCreateProduct,
  ...reducerShowProduct,
};
