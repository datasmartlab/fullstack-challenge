import * as yup from "yup";

let productSchema = yup.object().shape({
  id: yup.number().required().positive().integer(),
  nome: yup.string().required(),
  preco: yup.number().required().positive().integer(),
  descricao: yup.string().required(),
});

export default productSchema;
