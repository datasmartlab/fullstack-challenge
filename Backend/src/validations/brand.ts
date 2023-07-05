import * as Yup from 'yup';

export const BrandSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
});
