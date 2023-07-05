import { Router } from 'express';
import { CreateProduct } from '../controllers/productControllers/create';
import { UpdateProduct } from '../controllers/productControllers/update';
import { DeleteProduct } from '../controllers/productControllers/delete';
import { ListProduct } from '../controllers/productControllers/list';
import { ShowProduct } from '../controllers/productControllers/show';
import { CreateBrand } from '../controllers/brandControllers/create';
import { DeleteBrand } from '../controllers/brandControllers/delete';
const mainRoutes = Router();

//rotas das Marcas

mainRoutes.route('/brand').post(CreateBrand);
mainRoutes.route('/brand/:id').delete(DeleteBrand);

// rotas do produto
mainRoutes.route('/product').get(ListProduct).post(CreateProduct);

mainRoutes
    .route('/product/:id')
    .get(ShowProduct)
    .delete(DeleteProduct)
    .put(UpdateProduct);

export default mainRoutes;
