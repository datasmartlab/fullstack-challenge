import * as yup from "yup";

let productSchema = yup.object().shape({
  id: yup.number().required().positive().integer(),
});

export default productSchema;
