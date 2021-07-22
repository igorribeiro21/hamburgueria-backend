import ProductRepository from "../repositories/ProductRepository";


class ProductService {
    async createProduct(req, res) {
        const { name, description, price, id_type_product } = req.body;

        try {
            const verificationProduct = await ProductRepository.getOne(name);

            if (verificationProduct)
                return res.status(400).json({ message: 'Produto já está cadastrado' });
            const product = await ProductRepository.createProduct(name, description, price, id_type_product);

            return res.status(200).json({
                product,
                isSuccess: true,
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
            const products = await ProductRepository.getAll();

            if(!products){
                return res.status(400).json({
                    isSuccess: false,
                    message:'Não foi encontrado produtos'
                });
            }

            return res.status(200).json(products);
        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor!',
                err
            })
        }
    }

    async getIdProduct(req,res){
        try {
            const { id } = req.params;

            const product = await ProductRepository.getId(id);

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

    async updateProduct(req,res){
        const { name, description, price, id_type_product } = req.body;
        const { id } = req.params;

        try {
            const product = await ProductRepository.getId(id);

            if (!product) {
                return res.status(400).json({ message: 'Produto não encontrado' });
            }

            const productUpdated = await ProductRepository.updateId(id,name, description, price, id_type_product );

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

    async deleteId(req,res){
        const { id } = req.params;

        try {

            const product = await ProductRepository.getId(id);

            if (!product) {
                return res.status(400).json({ message: 'Produto não encontrado' });
            }

            await ProductRepository.deleteId(id);
            
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

export default new ProductService();