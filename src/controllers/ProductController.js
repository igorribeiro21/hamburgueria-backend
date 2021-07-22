import Product from '../models/Product';
import TypeProduct from '../models/TypeProduct';
import ProductService from '../services/ProductService';

class ProductController {
    async post(req, res) {

        return await ProductService.createProduct(req,res);
    }

    async getAllProducts(req, res) {

        return await ProductService.getAllProducts(req,res);
    }

    async getId(req, res) {
        
        return await ProductService.getIdProduct(req,res);
    }

    async updateId(req, res) {

        return await ProductService.updateProduct(req,res);
    }

    async deleteId(req, res) {
        
        return await ProductService.deleteId(req,res);
    }
}

export default new ProductController();