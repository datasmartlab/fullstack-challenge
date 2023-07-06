import { Router } from 'express';
import { CreateProduct } from '../controllers/productControllers/create';
import { UpdateProduct } from '../controllers/productControllers/update';
import { DeleteProduct } from '../controllers/productControllers/delete';
import { ListProduct } from '../controllers/productControllers/list';
import { ShowProduct } from '../controllers/productControllers/show';
import { CreateBrand } from '../controllers/brandControllers/create';
import { DeleteBrand } from '../controllers/brandControllers/delete';
import { ListBrand } from '../controllers/brandControllers/list';
import { ShowBrand } from '../controllers/brandControllers/show';
import { UpdateBrand } from '../controllers/brandControllers/update';
const mainRoutes = Router();

//rotas das Marcas

mainRoutes.route('/brand').post(CreateBrand).get(ListBrand);
mainRoutes
    .route('/brand/:id')
    .get(ShowBrand)
    .delete(DeleteBrand)
    .put(UpdateBrand);

// rotas do produto
mainRoutes.route('/product').get(ListProduct).post(CreateProduct);

mainRoutes
    .route('/product/:id')
    .get(ShowProduct)
    .delete(DeleteProduct)
    .put(UpdateProduct);

export default mainRoutes;
