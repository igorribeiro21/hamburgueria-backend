import TypeProduct from '../models/TypeProduct';

class TypeProductController {
    async post(req, res) {
        const { name } = req.body;

        try {
            const typeProduct = await TypeProduct.findOne({ where: { name } });

            if (typeProduct) {
                return res.status(400).json({ message: 'Tipo de Produto já cadastrado!' });
            }

            const createTypeProduct = await TypeProduct.create({ name });

            return res.status(200).json(createTypeProduct);
        } catch (err) {
            return res.status(500).json(
                {
                    message: 'Erro interno de servidor',
                    err
                }
            );
        }
    }

    async getAll(req, res) {
        try {
            const typesProduct = await TypeProduct.findAll({
                attributes: ['id', 'name']
            });

            return res.status(200).json(typesProduct);


        } catch (err) {
            return res.status(500).json(
                {
                    message: 'Erro interno de servidor',
                    err
                }
            );
        }
    }

    async getId(req, res) {
        try {
            const { id } = req.params;

            const typeProduct = await TypeProduct.findOne({
                attributes: ['id', 'name'],
                where: { id }
            });

            if (!typeProduct)
                return res.status(400).json({ message: 'Tipo de produto não encontrado' });


            return res.status(200).json(typeProduct);

        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor',
                err
            })
        }
    }

    async updateId(req, res) {
        const { id } = req.params;
        const { name } = req.body;

        try {
            const typeProduct = await TypeProduct.findOne({ where: { id } });

            if (!typeProduct)
                return res.status(400).json({ message: 'Tipo de produto não encontrado' });

            const typeProductUpdated = await TypeProduct.update(
                { name },
                { where: { id } }
            )

            return res.status(200).json({ id, name });
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
            const typeProduct = await TypeProduct.findOne({ where: { id } });

            if (!typeProduct)
                return res.status(400).json({ message: 'Tipo de produto não encontrado' });

            const destroy = await TypeProduct.destroy({ where: { id } });

            if (destroy)
                return res.status(200).json({ message: 'Produto deletado com sucesso!' });

        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor',
                err
            })
        }
    }
}
export default new TypeProductController();