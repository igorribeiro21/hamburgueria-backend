import { Model, DataTypes } from 'sequelize';
import TypeProduct from './TypeProduct';

class Product extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.DECIMAL(10,2),
            id_type_product: DataTypes.INTEGER
        }, {
            sequelize,
            freezeTableName: true,
        });

        return this;
    }

    static associate(models) {        
        this.belongsTo(models.TypeProduct, { foreignKey:'id_type_product' });
    }
}

export default Product;