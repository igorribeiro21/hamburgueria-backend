import express from 'express';
import LoginController from '../controllers/LoginController';

const routes = express.Router();

routes.post('/',LoginController.login);

export default routes;