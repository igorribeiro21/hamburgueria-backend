import express from 'express';

import productRoutes from './productRoutes';
import typeProductRoutes from './typeProductRoutes';
import userRoutes from './userRoutes';
import loginRoutes from './loginRoutes';

const routes = express.Router();

routes.use('/product',productRoutes);
routes.use('/type-product',typeProductRoutes);
routes.use('/user',userRoutes);
routes.use('/login',loginRoutes);





export default routes;