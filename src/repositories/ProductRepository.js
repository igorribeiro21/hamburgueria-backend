import Product from "../models/Product";
import TypeProduct from "../models/TypeProduct";


class ProductRepository{
    async getOne(name){
        const product = await Product.findOne({ where: { name } });

        return product;
    }

    async createProduct(name, description, price, id_type_product ){
        const product = await Product.create({
            name, description, price, id_type_product
        });

        return product;
    }

    async getAll(){
        const products = await Product.findAll(
            {
                include: [
                    {
                        model: TypeProduct,
                        required: true,
                        attributes: [
                            'name'
                        ]
                    }
                ],
                order: [
                    ['id','DESC']
                ]
            }
        );

        return products;
    }

    async getId(id){
        const product = await Product.findOne({
            include: [{
                model: TypeProduct,
                required: true,
                attributes: [
                    'name'
                ]
            }],
            where: {
                id
            }
        });

        return product;
    }

    async updateId(id,name, description, price, id_type_product){
        const productUpdated = await Product.update({
            name, description, price, id_type_product
        }, {
            where: {
                id
            }
        });

        return productUpdated;
    }

    async deleteId(id){
        const destroy = await Product.destroy({
            where: {
                id
            }
        });

        return destroy;
    }
}

export default new ProductRepository();