import { Model, DataTypes } from 'sequelize';
import Product from '../models/Product';


class TypeProduct extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING
        }, {
            sequelize,
            freezeTableName: true
        });
        return this;
    }

    static associate(models) {
        this.hasOne(models.Product, { foreignKey: 'id_type_product' });
    }
}

export default TypeProduct;