import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import Product from '../models/Product';
import TypeProduct from '../models/TypeProduct';
import User from '../models/User';


const connection = new Sequelize(dbConfig);

Product.init(connection);
TypeProduct.init(connection);
User.init(connection);


Product.associate(connection.models);
TypeProduct.associate(connection.models);

export default connection;