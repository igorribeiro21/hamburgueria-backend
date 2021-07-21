import { Model, DataTypes } from 'sequelize';

class User extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            type: DataTypes.STRING
        },{
            sequelize,
            freezeTableName: true
        })
    }
}

export default User;