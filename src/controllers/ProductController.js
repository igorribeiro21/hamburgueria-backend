import Product from '../models/Product';
import TypeProduct from '../models/TypeProduct';

class ProductController {
    async post(req, res) {
        const { name, description, price, id_type_product } = req.body;

        try {
            const verificationProduct = await Product.findOne({ where: { name } });
            if (verificationProduct)
                return res.status(400).json({ message: 'Produto já está cadastrado' });
            const product = await Product.create({
                name, description, price, id_type_product
            });

            return res.status(200).json({
                product,
                isSuccess:true,
                message: 'Produto criado com sucesso'
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor',
                err,
                isSuccess: false
            });
        }
    }

    async getAllProducts(req, res) {
        try {
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

            return res.status(200).json(products);
        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor!',
                err
            })
        }
    }

    async getId(req, res) {
        try {
            const { id } = req.params;

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

            if (!product) {
                return res.status(400).json({
                    message: 'Produto não encontrado!'
                });
            }

            return res.status(200).json(product);
        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor!',
                err
            })
        }
    }

    async updateId(req, res) {
        const { name, description, price, id_type_product } = req.body;
        const { id } = req.params;

        try {
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(400).json({ message: 'Produto não encontrado' });
            }

            const productUpdated = await Product.update({
                name, description, price, id_type_product
            }, {
                where: {
                    id
                }
            });

            return res.status(200).json({
                productUpdated,
                isSuccess: true,
                message: 'Produto atualizado com sucesso'
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor',
                err
            })
        }
    }

    async deleteId(req, res) {
        const { id } = req.params;

        try {

            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(400).json({ message: 'Produto não encontrado' });
            }

            await Product.destroy({
                where: { id }
            });
            
            return res.status(200).json({
                message: 'Produto deletado com sucesso',
                isSuccess: true
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor',
                err
            })
        }
    }
}

export default new ProductController();