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
import ValidationBrand from '../validations/brand';
import ValidationProduct from '../validations/product';
import { translate } from '../translate/translate';
const mainRoutes = Router();

mainRoutes.use(translate);

//rotas das Marcas
mainRoutes.route('/brand').post(ValidationBrand, CreateBrand).get(ListBrand);

mainRoutes
    .route('/brand/:id')
    .get(ShowBrand)
    .delete(DeleteBrand)
    .put(ValidationBrand, UpdateBrand);

// rotas do produto
mainRoutes
    .route('/product')
    .get(ListProduct)
    .post(ValidationProduct, CreateProduct);

mainRoutes
    .route('/product/:id')
    .get(ShowProduct)
    .delete(DeleteProduct)
    .put(ValidationProduct, UpdateProduct);

export default mainRoutes;
