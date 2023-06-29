import * as Yup from 'yup';

export const ProductSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string(),
    price: Yup.number()
        .required('Preço é obrigatória')
        .positive('o preço precisa ser positivo'),
});
