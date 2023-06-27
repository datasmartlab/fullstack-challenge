import { Router } from 'express';
import { Create } from '../controllers/productControllers/create';
import { Update } from '../controllers/productControllers/update';
import { Delete } from '../controllers/productControllers/delete';
import { List } from '../controllers/productControllers/list';
import { Show } from '../controllers/productControllers/show';

const mainRoutes = Router();

mainRoutes.route('/product').get(List).post(Create);

mainRoutes.route('/product/:id').get(Show).delete(Delete).put(Update);

export default mainRoutes;
